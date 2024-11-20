"use client";
import CoWorkingSpaceCard from "./CoWorkingSpaceCard";
import Link from "next/link";
import CustomButton from "./common/Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CoWorkingSpaceList = ({
  coWorkingSpaces,
}: {
  coWorkingSpaces: CoWorkingSpaceItem[];
}) => {
  const { data: session } = useSession();
  if (!session?.user.token) {
    return null;
  }
  let role = null;
  if (session != null) {
    role = session.user.role;
  }
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="mt-5 flex flex-row items-start justify-start flex-wrap gap-8">
        {coWorkingSpaces.map((coWorkingSpace) => (
          <div className="flex flex-col space-y-2 items-center w-fit">
            <Link
              href={`/coworkingspaces/${coWorkingSpace.id}`}
              className="flex flex-col space-y-4 w-[320px] h-[420px] p-4 border-2 border-neutral-300 hover:border-neutral-500 rounded-xl transition-shadow hover:shadow-xl"
            >
              <p className="subtitle3 s-full text-center">
                {coWorkingSpace.name}
              </p>
              <CoWorkingSpaceCard
                key={coWorkingSpace._id}
                data={coWorkingSpace}
              ></CoWorkingSpaceCard>
            </Link>
            {role == "admin" ? (
              <div className="flex items-center justify-center">
                <CustomButton
                  onClick={() => {
                    router.push(`/coworkingspaces/${coWorkingSpace.id}/edit`);
                  }}
                  className="w-[50%] bg-secondary-400 hover:bg-secondary-500"
                >
                  Edit
                </CustomButton>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoWorkingSpaceList;
