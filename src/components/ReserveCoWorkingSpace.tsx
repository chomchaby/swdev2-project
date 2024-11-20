"use client";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CoWorkingSpaceCard from "@/components/CoWorkingSpaceCard";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomButton from "./common/Button";
import { useRouter } from "next/navigation";
import createBooking from "@/libs/createBooking";
import CustomSelect from "./common/Select";
import { useSession } from "next-auth/react";

const ReserveCoWorkingSpace = ({ coWorkingSpace }: { coWorkingSpace: any }) => {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [numberOfRooms, setNumberOfRooms] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) return null;

  const handleMakeBooking = async () => {
    setError(null);

    if (!reserveDate && !numberOfRooms) {
      setError("Please select a booking date and number of rooms.");
      return;
    }

    if (!reserveDate) {
      setError("Please select a booking date.");
      return;
    }

    if (!numberOfRooms) {
      setError("Please select number of rooms.");
      return;
    }

    if (reserveDate.isBefore(dayjs(), "day")) {
      setError("Please select a valid booking date.");
      return;
    }

    const bookingDate = reserveDate.format("YYYY-MM-DD");

    try {
      const result = await createBooking(
        coWorkingSpace.data.id,
        bookingDate,
        numberOfRooms,
        session.user.token
      );
      console.log(result);
      router.push("/bookings");
    } catch (error) {
      console.error("Booking failed:", error);
      setError("Failed to create booking. Please try again.");
    }
  };

  return (
    <main className="space-y-8">
      <CoWorkingSpaceCard data={coWorkingSpace.data} />
      <div>
        {!session || !session.user.token ? (
          <div className="flex justify-center">
            <CustomButton
              size="lg"
              color="secondary"
              className="w-[300px] "
              onClick={() => {
                router.push("/api/auth/signin");
              }}
            >
              Sign in to make booking
            </CustomButton>
          </div>
        ) : (
          <div className="space-y-8">
            <p className="h3 font-bold">Reserve</p>

            <div className="flex items-center space-x-4">
              <p className="body1-semibold w-[200px]">Booking Date:</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="bg-white"
                  value={reserveDate}
                  onChange={(value) => setReserveDate(value)}
                />
              </LocalizationProvider>
            </div>
            <div className="flex items-center space-x-4">
              <p className="body1-semibold w-[200px]">Number of rooms:</p>
              <div className="w-[250px]">
                <CustomSelect
                  items={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                  ]}
                  selectedItem={String(numberOfRooms)} // Ensure selected item is a string
                  onChange={(value: string) => setNumberOfRooms(Number(value))}
                  label="Number of Rooms"
                  error={false} // Set to true if validation error
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="w-full flex justify-center">
              <CustomButton
                size="lg"
                className="w-[300px]"
                onClick={handleMakeBooking}
              >
                Make Booking
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ReserveCoWorkingSpace;
