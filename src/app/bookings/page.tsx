import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import PageTitle from "@/components/common/PageTitle";
import BookingList from "@/components/BookingList";

export default async function BookingListPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);

  return (
    <main>
      <PageTitle>
        {profile.data.role == "user" ? "My Bookings" : "Booking List"}
      </PageTitle>
      <BookingList></BookingList>
    </main>
  );
}
