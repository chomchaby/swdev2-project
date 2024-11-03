import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import PageTitle from "@/components/common/PageTitle";
const BookingInfoPage = ({
  params,
}: {
  params: { coworkingspaceid: string; bookingid: string };
}) => {
  const { coworkingspaceid, bookingid } = params;
  return (
    <main>
      <PageTitle>Co-Working Space Room Booking</PageTitle>
      <div>
        <div>{coworkingspaceid}</div>
        <div>{bookingid}</div>
      </div>
    </main>
  );
};
export default BookingInfoPage;
