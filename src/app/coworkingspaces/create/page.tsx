import PageTitle from "@/components/common/PageTitle";
import CoWorkingSpaceCardEdit from "@/components/CoWorkingSpaceCardEdit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function CreateCoWorkingSpacePage(){
    const session = await getServerSession(authOptions);
    if(!session)return;
    
    return(
        <div>
            <PageTitle>Create Co-working Space</PageTitle>
            <CoWorkingSpaceCardEdit variant="create" token={session.user.token}></CoWorkingSpaceCardEdit>
        </div>
    )
}