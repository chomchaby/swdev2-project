"use client";
import CoWorkingSpaceCardEdit from "@/components/CoWorkingSpaceCardEdit";
import PageTitle from "@/components/common/PageTitle";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function EditCoWorkingSpace({
  params,
}: {
  params: { coworkingspaceid: string };
}) {
  const { data: session } = useSession();
  if (!session || !session.user.token || session.user.role != "admin")
    return null;

  const [coWorkingSpace, setCoWorkingSpace] = useState<
    CoWorkingSpaceJson | undefined
  >();

  useEffect(() => {
    const getData = async () => {
      const data = await getCoWorkingSpace(params.coworkingspaceid);
      setCoWorkingSpace(data);
    };
    getData();
  }, [params.coworkingspaceid]);

  // Check if coWorkingSpace is undefined before rendering
  if (!coWorkingSpace) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageTitle>Update Co-woking Space</PageTitle>
      <div className="">
        <CoWorkingSpaceCardEdit
          variant="edit"
          data={coWorkingSpace.data}
          token={session.user.token}
        ></CoWorkingSpaceCardEdit>
      </div>
    </div>
  );
}
