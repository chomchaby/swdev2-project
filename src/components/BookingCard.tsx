import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faEdit,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import CustomTextButton from "./common/TextButton";

const BookingCard = ({ data }: { data: BookingItem }) => {
  const router = useRouter();
  const [coWorkingSpace, setCoWorkingSpace] = useState<CoWorkingSpaceItem>();
  const [isLoading, setIsLoading] = useState(true);

  // should useSWR to load co-working space data, may be fix later...
  useEffect(() => {
    const fetchCoworkingSpaceData = async (id: string) => {
      try {
        const coWorkingSpace = await getCoWorkingSpace(id);
        setCoWorkingSpace(coWorkingSpace.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching co-working space data: ", error);
      }
    };

    fetchCoworkingSpaceData(data.coworkingspace._id);
  }, [data.coworkingspace._id]);

  if (isLoading || !coWorkingSpace) {
    // Render a loading state or nothing while data is being fetched
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="border-2 border-neutral-300 rounded-sm w-full grid grid-cols-[auto_1fr_auto] space-x-8 h-[160px] md:h-[180px] lg:h-[200px]">
      <div className="w-[0px] lg:w-[400px] relative">
        <Image
          src={coWorkingSpace.picture}
          alt={coWorkingSpace.name}
          fill
          objectFit="cover"
        ></Image>
      </div>
      <div className="flex flex-col space-y-1 py-2 md:py-4">
        <div className="subtitle1">{coWorkingSpace.name}</div>
        <div className="flex flex-col text-neutral-600 p">
          <div>
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-secondary-500 w-[1rem] mr-[0.5rem]"
            ></FontAwesomeIcon>
            {coWorkingSpace.address}, {coWorkingSpace.province}
          </div>
          <div>
            <FontAwesomeIcon
              icon={faClock}
              className="text-secondary-500 w-[1rem] mr-[0.5rem]"
            ></FontAwesomeIcon>
            {coWorkingSpace.operatingHours}
          </div>
        </div>
        <div className="h-full flex flex-col justify-end">
          <div className="p md:body2-regular">
            Booking Date: {data.bookingDate.split("T")[0]}
          </div>
          <div className="p md:body2-regular">
            Number of Rooms: {data.numOfRooms}
          </div>
        </div>
      </div>
      <CustomTextButton
        className="pt-3 pr-6 h-fit"
        onClick={() =>
          router.push(
            `/coworkingspaces/${data.coworkingspace._id}/bookings/${data._id}`
          )
        }
      >
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </CustomTextButton>
    </div>
  );
};

export default BookingCard;
