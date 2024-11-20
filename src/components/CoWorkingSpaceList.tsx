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
  let role = null;
  if (session != null) {
    role = session.user.role;
  }
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="mt-5 flex flex-row items-start justify-start flex-wrap gap-8">
        {coWorkingSpaces.map((coWorkingSpace) => (
          <Link
            key={coWorkingSpace.id}
            href={`/coworkingspaces/${coWorkingSpace.id}`}
            className="flex flex-col space-y-4 w-[100%] sm:w-[97%] md:w-[47%] lg:w-[31%] p-4 border-2 border-neutral-300 hover:border-neutral-500 rounded-xl transition-shadow hover:shadow-xl"
          >
            <p className="subtitle3 s-full text-center">
              {coWorkingSpace.name}
            </p>
            <CoWorkingSpaceCard
              key={coWorkingSpace._id}
              data={coWorkingSpace}
            ></CoWorkingSpaceCard>
            {role == "admin" ? (
              <CustomButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/coworkingspaces/${coWorkingSpace.id}/edit`);
                }}
                className="mx-auto w-[50%] bg-secondary-400 hover:bg-secondary-500"
              >
                Edit
              </CustomButton>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoWorkingSpaceList;
