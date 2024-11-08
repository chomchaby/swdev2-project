"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import createBooking from "@/libs/createBooking";
import updateBooking from "@/libs/updateBooking";
import deleteBooking from "@/libs/deleteBooking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import CustomSelect from "./common/Select";
import CustomButton from "./common/Button";

const numOfRoomsFilterItems = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];
const tomorrow = dayjs().add(1, "day");
const formSchema = z.object({
  bookingDate: z
    .any()
    .refine((val) => val !== undefined, {
      message: "Booking date is required.",
    })
    .refine((val): val is Dayjs => dayjs.isDayjs(val) && val.isValid(), {
      message: "Booking date must be a valid date.",
    }),
  numOfRooms: z
    .any()
    .refine((val) => val !== undefined, {
      message: "Number of rooms is required.",
    })
    .refine((val): val is number => val >= 1 && val <= 3, {
      message: "Number of rooms must be between 1 and 3.",
    }),
});

type formData = z.infer<typeof formSchema>;

const BookingForm = ({
  mode,
  bookingData,
  coWorkingSpaceId,
}: {
  mode: "create" | "update";
  bookingData: BookingItem | undefined;
  coWorkingSpaceId: string;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session?.user.token) {
    return null;
  }
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingDate: bookingData ? dayjs(bookingData.bookingDate) : undefined,
      numOfRooms: bookingData ? bookingData.numOfRooms : undefined,
    },
  });

  const onSubmit = async (data: formData) => {
    if (mode === "create") {
      try {
        const response = await createBooking(
          coWorkingSpaceId,
          data.bookingDate.format("YYYY-MM-DD"),
          data.numOfRooms,
          session.user.token
        );
        console.log("Booking created: ", response);
        alert("Booking created successfully!");
        router.push("/bookings");
      } catch (error) {
        console.error("Error creating booking: ", error);
        alert("An error occurred. Please try again.");
      }
    } else if (mode === "update" && bookingData) {
      try {
        const response = await updateBooking(
          bookingData._id,
          data.bookingDate.format("YYYY-MM-DD"),
          data.numOfRooms,
          session.user.token
        );
        console.log("Booking updated: ", response);
        alert("Booking updated successfully!");
        router.replace("/bookings");
      } catch (error) {
        console.error("Error updating booking: ", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleDeleteBooking = async () => {
    if (mode === "update" && bookingData) {
      try {
        const response = await deleteBooking(
          bookingData._id,
          session.user.token
        );
        console.log("Booking deleted: ", response);
        alert("Cancel the booking successfully");
        router.replace("/bookings");
      } catch (error) {
        console.error("Error deleting booking: ", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <div className="body2-md">Booking Date:</div>
          <div className="flex-grow">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name="bookingDate"
                render={({ field }) => (
                  <DatePicker
                    {...field} // Pass the field's value and onChange from react-hook-form
                    label="Booking Date"
                    minDate={tomorrow}
                    views={["year", "month", "day"]}
                    onChange={(newValue: Dayjs | null) =>
                      field.onChange(newValue || dayjs())
                    }
                    slotProps={{
                      textField: {
                        helperText: errors.bookingDate?.message,
                        error: !!errors.bookingDate,
                        size: "small",
                        fullWidth: true,
                        sx: {
                          "& .MuiInputBase-input": {
                            color: "#495057", // Text color inside the input
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#556AEB", // Focus label color
                          },
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#556AEB",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#556AEB",
                            },
                          },
                        },
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="body2-md">Number of Rooms:</div>
          <div className="flex-grow">
            <CustomSelect
              items={numOfRoomsFilterItems}
              selectedItem={
                watch("numOfRooms") !== undefined
                  ? watch("numOfRooms").toString()
                  : ""
              }
              onChange={(value: string) =>
                setValue("numOfRooms", Number(value))
              }
              label="Number of Rooms"
              helpertext={errors.numOfRooms?.message}
              error={!!errors.numOfRooms}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3 mt-6">
        {mode === "create" ? (
          <CustomButton type="submit">Submit</CustomButton>
        ) : (
          <>
            <CustomButton type="submit">Save Change</CustomButton>
            <CustomButton type="button" onClick={handleDeleteBooking}>
              Cancel Booking
            </CustomButton>
          </>
        )}
        <CustomButton type="button" onClick={() => router.back()}>
          Back
        </CustomButton>
      </div>
    </form>
  );
};

export default BookingForm;
