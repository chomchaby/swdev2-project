"use client";
import PageTitle from "@/components/common/PageTitle";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import CoWorkingSpaceList from "@/components/CoWorkingSpaceList";
import { LinearProgress } from "@mui/material";
import CustomButton from "@/components/common/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CoworkingSpacesPage() {
  const { data: session } = useSession();
  const [coWorkingSpaces, setCoWorkingSpaces] = useState<
    CoWorkingSpacesJson | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoWorkingSpaces();
      setCoWorkingSpaces(data);
      console.log("data", data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle>Co-working Space</PageTitle>
        {session != null && session.user.role === "admin" && (
          <Link href="/coworkingspaces/create">
            <CustomButton className="w-[100px] h-[40px]">Create</CustomButton>
          </Link>
        )}
      </div>
      {coWorkingSpaces ? (
        <CoWorkingSpaceList coWorkingSpaces={coWorkingSpaces.data} />
      ) : (
        <p>
          Loading ... <LinearProgress />
        </p>
      )}
    </div>
  );
}
