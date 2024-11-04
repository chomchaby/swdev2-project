"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import getBooking from "@/libs/getBooking";
import PageTitle from "@/components/common/PageTitle";
import CoWorkingSpaceCard from "@/components/CoWorkingSpaceCard";
import BookingForm from "@/components/BookingForm";

const BookingInfoPage = ({
  params,
}: {
  params: { coworkingspaceid: string; bookingid: string };
}) => {
  const { coworkingspaceid, bookingid } = params;
  const { data: session } = useSession();
  if (!session?.user.token) {
    return null;
  }
  const [coWorkingSpace, setCoWorkingSpace] =
    useState<CoWorkingSpaceItem | null>(null);
  const [booking, setBooking] = useState<BookingItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch co-working space data
        const coWorkingSpaceData = await getCoWorkingSpace(coworkingspaceid);
        setCoWorkingSpace(coWorkingSpaceData.data);

        // Fetch booking data if bookingid is provided
        if (bookingid) {
          const bookingDetail = await getBooking(bookingid, session.user.token);
          setBooking(bookingDetail);
        }
      } catch (e) {
        console.error("Error fetching data: ", e);
      } finally {
        setIsLoading(false); // Set loading to false after all fetches complete
      }
    };

    fetchData();
  }, [coworkingspaceid, bookingid, session?.user.token]);

  // Loading state management
  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  // Handle case where coWorkingSpace is null
  if (!coWorkingSpace) {
    return <div>No co-working space found.</div>;
  }

  return (
    <main>
      <PageTitle>Co-Working Space Room Booking</PageTitle>
      <div className="subtitle2 mb-[12px]">{coWorkingSpace.name}</div>
      <div className="flex flex-wrap space-x-[48px] ">
        <div className="w-[100%] md:w-[65%]">
          <CoWorkingSpaceCard data={coWorkingSpace} />
        </div>
        <div className="flex-grow">
          {/* Allow BookingForm to take remaining space */}
          <BookingForm />
        </div>
      </div>
    </main>
  );
};

export default BookingInfoPage;
