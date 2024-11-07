import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import PageTitle from "@/components/common/PageTitle";
import BookingList from "@/components/BookingList";

export default async function BookingListPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  return (
    <main>
      <PageTitle>
        {session.user.role == "user" ? "My Bookings" : "Booking List"}
      </PageTitle>
      <BookingList></BookingList>
    </main>
  );
}
