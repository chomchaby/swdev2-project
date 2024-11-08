import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import getBooking from "@/libs/getBooking";
import PageTitle from "@/components/common/PageTitle";
import CoWorkingSpaceCard from "@/components/CoWorkingSpaceCard";
import BookingForm from "@/components/BookingForm";
import { notFound } from "next/navigation";

const BookingInfoPage = async ({
  params,
}: {
  params: { coworkingspaceid: string; bookingid: string };
}) => {
  // Get the user session
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const { coworkingspaceid, bookingid } = params;
  let coWorkingSpace: CoWorkingSpaceJson;

  // Try to fetch co-working space data
  try {
    coWorkingSpace = await getCoWorkingSpace(coworkingspaceid);
  } catch (error) {
    // Redirect to 404 page if fetching fails
    notFound();
  }

  let bookingData: BookingJson | undefined;
  // Fetch booking data if bookingid is present
  if (bookingid) {
    try {
      bookingData = await getBooking(bookingid, session.user.token);
    } catch (error) {
      // Redirect to 404 page if fetching booking fails
      notFound();
    }
  }

  return (
    <main>
      <PageTitle>{bookingid ? "Modify " : "New "} Room Reservation</PageTitle>
      <div className="subtitle2 mb-[12px]">{coWorkingSpace.data.name}</div>
      <div className="flex flex-col space-y-[24px] md:flex-row md:space-x-[48px]">
        <div className="w-full md:w-3/5">
          <CoWorkingSpaceCard data={coWorkingSpace.data} />
        </div>
        <div className="w-full md:w-2/5">
          <BookingForm
            mode={bookingid ? "update" : "create"}
            bookingData={bookingData?.data} // Pass booking data only if available
            coWorkingSpaceId={coworkingspaceid}
          />
        </div>
      </div>
    </main>
  );
};

export default BookingInfoPage;
