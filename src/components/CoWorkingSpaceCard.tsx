import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
const CoWorkingSpaceCard = ({ data }: { data: CoWorkingSpaceItem }) => {
  console.log(data.picture);
  return (
    <div className="flex flex-col space-y-[6px]">
      <div className="w-full pt-[60%] relative">
        <Image
          src={data.picture}
          alt="Picture of Co-working space"
          fill
          objectFit="cover"
        />
      </div>
      <div>
        <FontAwesomeIcon
          icon={faClock}
          className="text-secondary-500 w-[1rem] mr-[0.5rem]"
        ></FontAwesomeIcon>
        Operating Hours: {data.opertingHours}
      </div>
      <div>
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-secondary-500 w-[1rem] mr-[0.5rem]"
        ></FontAwesomeIcon>
        Address: {data.address}, {data.province}
      </div>
      <div>
        <FontAwesomeIcon
          icon={faPhone}
          className="text-secondary-500 w-[1rem] mr-[0.5rem]"
        ></FontAwesomeIcon>
        Tel: {data.tel}
      </div>
    </div>
  );
};
export default CoWorkingSpaceCard;
