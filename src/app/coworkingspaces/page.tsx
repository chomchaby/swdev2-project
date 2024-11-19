import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import PageTitle from "@/components/common/PageTitle";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import CoWorkingSpaceList from "@/components/CoWorkingSpaceList";
import { LinearProgress } from "@mui/material";
import CustomButton from "@/components/common/Button";
import Link from "next/link";

export default async function CoworkingSpacesPage() {
    const session = await getServerSession(authOptions);

    // if (!session || !session.user.token) return 

    const coWorkingSpaces = await getCoWorkingSpaces();

    return (
        <div>
            <div className='flex items-center justify-between'>
                <PageTitle>Co-working Space</PageTitle>
                {session != null && session.user.role === 'admin' && (
                    <Link href='/coworkingspaces/create'>
                        <CustomButton className='w-[100px] h-[40px]'>
                            Create
                        </CustomButton>
                    </Link>
                )}
            </div>
            {coWorkingSpaces ? (
                <CoWorkingSpaceList coWorkingSpaces={coWorkingSpaces.data} session={session}/>
            ) : (
                <p>Loading ... <LinearProgress /></p>
            )}
        </div>
    );
}
