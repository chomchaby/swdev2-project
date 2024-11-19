import CoWorkingSpaceCardEdit from "@/components/CoWorkingSpaceCardEdit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import PageTitle from "@/components/common/PageTitle";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";

export default async function EditCoWorkingSpace({params}:{params: { coworkingspaceid: string}}){
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token || session.user.role != "admin") return null;
    const coWorkingSpace = await getCoWorkingSpace(params.coworkingspaceid);
    return(
        <div>
            <PageTitle>Update Co-woking Space</PageTitle>
            <div className=''>
            <CoWorkingSpaceCardEdit variant='edit' data={coWorkingSpace.data} token={session.user.token}></CoWorkingSpaceCardEdit>
            </div>
        </div>
    )
}