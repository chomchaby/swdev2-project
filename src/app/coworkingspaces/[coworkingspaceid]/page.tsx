"use client";
import PageTitle from "@/components/common/PageTitle";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import ReserveCoWorkingSpace from "@/components/ReserveCoWorkingSpace";
import { useEffect, useState } from "react";

const CoWorkingInfoPage = ({
  params,
}: {
  params: { coworkingspaceid: string };
}) => {
  const { coworkingspaceid } = params;
  const [coWorkingSpace, setCoWorkingSpace] = useState<
    CoWorkingSpaceJson | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoWorkingSpace(coworkingspaceid);
      setCoWorkingSpace(data);
    };
    fetchData();
  }, []);

  return (
    <main className="space-y-8">
      {coWorkingSpace && (
        <>
          <PageTitle>{coWorkingSpace.data.name}</PageTitle>
          <ReserveCoWorkingSpace coWorkingSpace={coWorkingSpace} />
        </>
      )}
    </main>
  );
};
export default CoWorkingInfoPage;
