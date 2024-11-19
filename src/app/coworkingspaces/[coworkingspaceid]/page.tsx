import PageTitle from "@/components/common/PageTitle";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ReserveCoWorkingSpace from "@/components/ReserveCoWorkingSpace";

const CoWorkingInfoPage = async({
  params,
}: {
  params: { coworkingspaceid: string };
}) => {
  const { coworkingspaceid } = params;
  const coWorkingSpace = await getCoWorkingSpace(coworkingspaceid);
  const session = await getServerSession(authOptions);

  return (
    <main className='space-y-8'>
      <PageTitle>{coWorkingSpace.data.name}</PageTitle>
      <ReserveCoWorkingSpace coWorkingSpace={coWorkingSpace} session={session} />
    </main>
  );
};
export default CoWorkingInfoPage;
