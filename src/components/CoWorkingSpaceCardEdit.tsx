"use client";
import { useState, useEffect } from "react";
import updateCoWorkingSpace from "@/libs/updateCoWorkingSpace";
import createCoWorkingSpace from "@/libs/createCoWorkingSpace";
import UploadImage from "./UploadImage";
import CustomButton from "./common/Button";
import deleteCoWorkingSpace from "@/libs/deleteCoWorkingSpace";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import TimeSelector from "./common/TimeSelector";

type CoWorkingSpaceItem = {
  id?: string;
  name: string;
  address: string;
  operatingHours: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
};

interface CoWorkingSpaceCardEditProps {
  data?: CoWorkingSpaceItem | null;
  variant: "edit" | "create";
  token: string;
}

const CoWorkingSpaceCardEdit = ({
  data = null,
  variant,
  token,
}: CoWorkingSpaceCardEditProps) => {
  const router = useRouter();
  const [openTime, setOpenTime] = useState<Dayjs>(dayjs("2024-01-01T09:00"));
  const [closeTime, setCloseTime] = useState<Dayjs>(dayjs("2024-01-01T20:00"));

  const [formData, setFormData] = useState<CoWorkingSpaceItem>({
    name: data?.name || "",
    address: data?.address || "",
    operatingHours: data?.operatingHours || "",
    province: data?.province || "",
    postalcode: data?.postalcode || "",
    tel: data?.tel || "",
    picture: data?.picture || "",
  });

  useEffect(() => {
    if (variant === "edit" && data) {
      setFormData({
        name: data.name,
        address: data.address,
        operatingHours: data.operatingHours,
        province: data.province,
        postalcode: data.postalcode,
        tel: data.tel,
        picture: data.picture,
      });
      const [start, end] = data.operatingHours.split("-");
      console.log(data.operatingHours);
      setOpenTime(dayjs(`2024-01-01T${start}`));
      setCloseTime(dayjs(`2024-01-01T${end}`));
      setImageUrl(data.picture);
    }
  }, [variant, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "picture") {
      setImageUrl(value);
    }
  };
  const createOperatingTime = (): string => {
    return `${openTime?.format("HH:mm")}-${closeTime?.format("HH:mm")}`;
  };

  const handleSave = async () => {
    try {
      const operatingHours = createOperatingTime();
      if (variant === "edit" && data?.id) {
        const response = await updateCoWorkingSpace(
          data.id,
          formData.name,
          formData.address,
          operatingHours,
          formData.province,
          formData.postalcode,
          formData.tel,
          imageUrl,
          token
        );
        alert("Co-working space updated successfully");
        console.log(response);
        router.push("/coworkingspaces");
        setTimeout(() => {
          window.location.reload(); // Force a reload of the /bookings page
        }, 100); // Small delay (100ms) to ensure navigation is complete
      } else if (variant === "create") {
        const response = await createCoWorkingSpace(
          formData.name,
          formData.address,
          operatingHours,
          formData.province,
          formData.postalcode,
          formData.tel,
          formData.picture,
          token
        );
        alert("Co-working space created successfully");
        console.log(response);
        router.push("/coworkingspaces");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (data?.id) {
        const response = await deleteCoWorkingSpace(data.id, token);
        alert("Co-working space delete successfully");
        console.log(response);
        router.push("/coworkingspaces");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  const [imageUrl, setImageUrl] = useState<string>(formData.picture);

  useEffect(() => {
    // Update formData with the new image URL whenever imageUrl changes
    setFormData((prevData) => ({ ...prevData, picture: imageUrl }));
  }, [imageUrl]);

  return (
    <div className="space-y-4 items-center">
      <UploadImage
        setImageUrl={setImageUrl}
        initialImageUrl={formData.picture}
      />
      <div className="flex items-center justify-center space-x-4">
        <p className="subtitle3 w-[250px]">Name: </p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-neutral-600 p-2 rounded w-full"
        />
      </div>

      <div className="flex items-center justify-center space-x-4">
        <p className="subtitle3 w-[250px]">Address: </p>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border border-neutral-600 p-2 rounded w-full"
        />
      </div>

      <div className="flex items-center justify-start space-x-4">
        <p className="subtitle3 w-[200px]">Operating Hours: </p>
        <TimeSelector
          initOpenTime={openTime}
          initCloseTime={closeTime}
          setOpenTime={setOpenTime}
          setCloseTime={setCloseTime}
        />
        {/* {openTime?(<p>{openTime.format('YYYY-MM-DDTHH:mm')}</p>):""} */}
      </div>

      <div className="flex items-center justify-center space-x-4">
        <p className="subtitle3 w-[250px]">Province: </p>
        <input
          type="text"
          name="province"
          placeholder="Province"
          value={formData.province}
          onChange={handleChange}
          className="border border-neutral-600 p-2 rounded w-full"
        />
      </div>

      <div className="flex items-center justify-center space-x-4">
        <p className="subtitle3 w-[250px]">Postal Code: </p>
        <input
          type="text"
          name="postalcode"
          placeholder="Postal Code"
          value={formData.postalcode}
          onChange={handleChange}
          className="border border-neutral-600 p-2 rounded w-full"
        />
      </div>

      <div className="flex items-center justify-center space-x-4">
        <p className="subtitle3 w-[250px]">Telephone: </p>
        <input
          type="text"
          name="tel"
          placeholder="Telephone"
          value={formData.tel}
          onChange={handleChange}
          className="border border-neutral-600 p-2 rounded w-full"
        />
      </div>

      <div className="flex space-x-4 items-center justify-center mt-4">
        {variant === "edit" ? (
          <CustomButton
            onClick={handleDelete}
            className="w-[200px] bg-red-500 hover:bg-red-600"
          >
            Delete
          </CustomButton>
        ) : (
          ""
        )}

        <CustomButton
          onClick={handleSave}
          className={`w-[200px] ${
            variant === "edit" ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          {variant === "edit" ? "Save" : "Create"}
        </CustomButton>
      </div>
    </div>
  );
};

export default CoWorkingSpaceCardEdit;
