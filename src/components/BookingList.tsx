"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import CustomSelect from "@/components/common/Select";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings }: { bookings: BookingItem[] }) => {
  const { data: session } = useSession();
  if (!session || !session.user?.token) {
    return null;
  }
  if (!session?.user.token) {
    return null;
  }
  const bookingFilter = [
    { label: "All", value: "all" },
    { label: "Incoming", value: "incoming" },
    { label: "Passed", value: "passed" },
  ];

  const [filter, setFilter] = useState<string>("all");
  const [showMyBookingsOnly, setShowMyBookingsOnly] = useState(false);
  const [bookingItems, setBookingItems] = useState<BookingItem[]>(bookings);
  // should fetch all co-working space data here...

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    let updatedBookingItems = [...bookings];
    if (filter === "incoming") {
      updatedBookingItems = bookings.filter(
        (item) => item.bookingDate >= today
      );
    } else if (filter === "passed") {
      updatedBookingItems = bookings.filter((item) => item.bookingDate < today);
    }
    if (session.user.role === "admin" && showMyBookingsOnly) {
      updatedBookingItems = bookings.filter(
        (item) => item.user === session.user._id
      );
    }
    setBookingItems(updatedBookingItems);
  }, [filter, showMyBookingsOnly]);

  return (
    <div className="flex flex-col space-y-[12px]">
      <div className="flex items-center space-x-3 mb-[12px]">
        <div className="body2-md">Filter:</div>
        <div className="w-[180px] ">
          <CustomSelect
            items={bookingFilter}
            selectedItem={filter}
            onChange={(value: string) => setFilter(value || "")}
            label="Booking Date"
          ></CustomSelect>
        </div>
        {session.user.role === "admin" && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="myBookingsOnly"
              checked={showMyBookingsOnly}
              onChange={(e) => setShowMyBookingsOnly(e.target.checked)}
              className="form-checkbox h-4 w-4"
            />
            <label htmlFor="myBookings" className="body2-md">
              Show My Bookings Only
            </label>
          </div>
        )}
      </div>
      {bookingItems.map((booking) => (
        <BookingCard key={booking._id} data={booking}></BookingCard>
      ))}
    </div>
  );
};

export default BookingList;
