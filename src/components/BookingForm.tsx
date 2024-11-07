"use client";
import { useSession } from "next-auth/react";
import getBooking from "@/libs/getBooking";
import createBooking from "@/libs/createBooking";
import updateBooking from "@/libs/updateBooking";
import deleteBooking from "@/libs/deleteBooking";
import { useEffect } from "react";
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
import { notFound } from "next/navigation";

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
  bookingId,
  coWorkingSpaceId,
}: {
  mode: "create" | "update";
  bookingId: string;
  coWorkingSpaceId: string;
}) => {
  const { data: session } = useSession();
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
      bookingDate: undefined,
      numOfRooms: undefined,
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
      } catch (error) {
        console.error("Error creating booking: ", error);
      }
    } else if (mode === "update" && bookingId) {
      try {
        const response = await updateBooking(
          bookingId,
          data.bookingDate.format("YYYY-MM-DD"),
          data.numOfRooms,
          session.user.token
        );
        console.log("Booking updated: ", response);
      } catch (error) {
        console.error("Error updating booking: ", error);
      }
    }
  };

  const handleDeleteBooking = async () => {
    if (mode === "update" && bookingId) {
      try {
        const response = await deleteBooking(bookingId, session.user.token);
        console.log("Booking deleted: ", response);
      } catch (error) {
        console.error("Error deleting booking: ", error);
      }
    }
  };

  // Fetch the booking data if in update mode
  useEffect(() => {
    if (mode === "update" && bookingId) {
      const fetchBooking = async () => {
        try {
          const bookingData = await getBooking(bookingId, session.user.token);
          if (bookingData) {
            setValue("bookingDate", dayjs(bookingData.data.bookingDate));
            setValue("numOfRooms", bookingData.data.numOfRooms);
          }
        } catch (error) {
          console.error("Error fetching booking data: ", error);
          // redirect to the page not found
        }
      };
      fetchBooking();
    }
  }, []);

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
            <CustomButton onClick={handleDeleteBooking}>
              Cancel Reservation
            </CustomButton>
          </>
        )}
        <CustomButton onClick={() => console.log("back")}>Back</CustomButton>
      </div>
    </form>
  );
};

export default BookingForm;
