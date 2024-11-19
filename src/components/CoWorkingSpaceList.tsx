'use client'
import CoWorkingSpaceCard from "./CoWorkingSpaceCard";
import Link from "next/link";
import CustomButton from "./common/Button";

const CoWorkingSpaceList = async({ coWorkingSpaces, session}: { coWorkingSpaces: CoWorkingSpaceItem[] ,session:any}) => {
    let role = null;
    if(session!=null){
        role = session.user.role;
    }
    return (
        <div className='flex justify-center'>
            <div className="mt-5 flex flex-row items-start justify-start flex-wrap gap-8">
                {coWorkingSpaces.map((coWorkingSpace) => (
                        <Link href={`/coworkingspaces/${coWorkingSpace.id}`} 
                            className='flex flex-col space-y-4 w-[100%] sm:w-[97%] md:w-[47%] lg:w-[31%] p-4 border-2 border-neutral-300 hover:border-neutral-500 rounded-xl transition-shadow hover:shadow-xl'>
                            <p className='subtitle3 s-full text-center'>{coWorkingSpace.name}</p>
                            <CoWorkingSpaceCard key={coWorkingSpace._id} data={coWorkingSpace}></CoWorkingSpaceCard>
                            {role == "admin" ?
                            (<div className='flex items-center justify-center'>
                                <Link href={`/coworkingspaces/${coWorkingSpace.id}/edit`} passHref>
                                <CustomButton className="w-[50%] bg-secondary-400 hover:bg-secondary-500">
                                    Edit
                                </CustomButton>
                                </Link>
                            </div>) : ("")
                            }
                        </Link>
                ))}
            </div>
        </div>
    );
};

export default CoWorkingSpaceList;
