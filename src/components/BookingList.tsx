"use client";
import { useState, useEffect } from "react";
import CustomSelect from "@/components/common/Select";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings }: { bookings: BookingItem[] }) => {
  const bookingFilter = [
    { label: "All", value: "all" },
    { label: "Incoming", value: "incoming" },
    { label: "Passed", value: "passed" },
  ];

  const [filter, setFilter] = useState<string>("all");
  const [bookingItems, setBookingItems] = useState<BookingItem[]>(bookings);
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
    setBookingItems(updatedBookingItems);
  }, [filter]);

  return (
    <div className="flex flex-col space-y-[12px]">
      <div className="flex items-center space-x-3 mb-[12px]">
        <div className="body2-md">Filter:</div>
        <div className="w-[180px] ">
          <CustomSelect
            items={bookingFilter}
            selectedItem={filter}
            onChange={(value: string) => setFilter(value)}
            label="Booking Date"
          ></CustomSelect>
        </div>
      </div>
      {bookingItems.map((booking) => (
        <BookingCard data={booking}></BookingCard>
      ))}
    </div>
  );
};

export default BookingList;
