"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomButton from "./common/Button";
import CustomTextButton from "./common/TextButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOut,
  faSignOutAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/api/auth/signin");
  };
  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/register");
  };
  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/api/auth/signout");
  };
  return (
    <div className="h-[72px] w-full bg-neutral-100 shadow-sm fixed top-0 left-0 right-0 z-30 grid grid-cols-[0%,auto,1fr,0%] md:grid-cols-[10%,auto,1fr,10%] xl:grid-cols-[15%,auto,1fr,15%] items-center px-4">
      <div></div>
      <Link href="/coworkingspaces" className="subtitle2 pr-4 md:pr-12 text-primary-600">
        Too Fast To Work
      </Link>
      <div className="flex flex-row items-center gap-x-4">
        {session ? (
          <>
            <div className="grow">
              <CustomTextButton
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/bookings");
                }}
                aria-label="Booking"
              >
                Booking
              </CustomTextButton>
            </div>
            <div>
              <FontAwesomeIcon
                icon={session.user.role === "admin" ? faUserShield : faUser}
                size={"1x"}
                className="text-neutral-700 pr-2"
              ></FontAwesomeIcon>
              <span className="body2-bold text-neutral-700">
                {session.user?.name}
              </span>
            </div>
            <CustomTextButton onClick={handleLogOut} aria-label="Log out">
              <FontAwesomeIcon
                icon={faSignOut}
                size={"1x"}
                className="pr-1"
              ></FontAwesomeIcon>
              Log out
            </CustomTextButton>
          </>
        ) : (
          <>
            <div className="grow"></div>
            <CustomButton onClick={handleLogIn} aria-label="Log in">
              Log in
            </CustomButton>
            <CustomButton onClick={handleSignUp} aria-label="Sign up">
              Sign up
            </CustomButton>
          </>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
