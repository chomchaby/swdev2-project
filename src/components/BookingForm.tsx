import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import CustomSelect from "./common/Select";
import CustomButton from "./common/Button";

const tomorrow = dayjs().add(1, "day");
const BookingForm = ({
  mode = "create",
  data,
}: {
  mode?: "create" | "update";
  data?: BookingItem;
}) => {
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
      .refine((val): val is Number => val >= 1 && val <= 3, {
        message: "Number of rooms must be between 1 and 3.",
      }),
  });

  type formData = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingDate: undefined,
      numOfRooms: undefined,
    },
  });

  const onSubmit = (data: formData) => {
    console.log(data);
  };

  const numOfRoomsFilterItems = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Booking Date"
          minDate={tomorrow}
          views={["year", "month", "day"]}
          onChange={(newValue: Dayjs | null) => {
            setValue("bookingDate", newValue || dayjs()); // Ensure `Dayjs` type
          }}
          slotProps={{
            textField: {
              helperText: errors.bookingDate?.message,
              error: !!errors.bookingDate,
            },
          }}
        />
      </LocalizationProvider>
      <div className="flex items-center space-x-3 mb-[12px]">
        <div className="body2-md">Number of rooms:</div>
        <div className="w-[180px]">
          <CustomSelect
            items={numOfRoomsFilterItems}
            selectedItem={
              watch("numOfRooms") !== undefined
                ? watch("numOfRooms").toString()
                : ""
            }
            onChange={(value: string) => setValue("numOfRooms", Number(value))}
            label="Rooms"
            helpertext={errors.numOfRooms?.message}
            error={!!errors.numOfRooms}
          />
        </div>
      </div>
      <CustomButton type="submit">Submit</CustomButton>
    </form>
  );
};

export default BookingForm;
