"use client";
import { useState } from "react";
import CustomSelect from "@/components/common/Select";
import BookingCard from "./BookingCard";

const BookingList = () => {
  const bookingFilter = [
    { label: "All", value: "all" },
    { label: "Incoming", value: "incoming" },
    { label: "Passed", value: "passed" },
  ];

  const [filter, setFilter] = useState<string>("all");

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
      <BookingCard></BookingCard>
    </div>
  );
};

export default BookingList;
