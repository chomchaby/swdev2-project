import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import PageTitle from "@/components/common/PageTitle";
import CoWorkingSpaceCard from "@/components/CoWorkingSpaceCard";
import BookingForm from "@/components/BookingForm";

const BookingInfoPage = async ({
  params,
}: {
  params: { coworkingspaceid: string; bookingid: string };
}) => {
  const { coworkingspaceid, bookingid } = params;
  const coWorkingSpace = await getCoWorkingSpace(coworkingspaceid);
  if (!coWorkingSpace) {
    return <div>No co-working space found.</div>;
  }
  return (
    <main>
      <PageTitle>Co-Working Space Room Booking</PageTitle>
      <div className="subtitle2 mb-[12px]">{coWorkingSpace.data.name}</div>
      <div className="flex flex-col space-y-[24px] md:flex-row md:space-x-[48px]">
        <div className="w-full md:w-3/5">
          <CoWorkingSpaceCard data={coWorkingSpace.data} />
        </div>
        <div className="w-full md:w-2/5">
          <BookingForm
            mode={bookingid ? "update" : "create"}
            bookingId={bookingid}
            coWorkingSpaceId={coworkingspaceid}
          />
        </div>
      </div>
    </main>
  );
};

export default BookingInfoPage;
