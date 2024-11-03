import PageTitle from "@/components/common/PageTitle";
const BookingInfoPage = ({
  params,
}: {
  params: { coworkingspaceid: string };
}) => {
  const { coworkingspaceid } = params;
  return (
    <main>
      <PageTitle>Co-Working Space Room Detail</PageTitle>
      <div>Co-Working Space Id: {coworkingspaceid}</div>
    </main>
  );
};
export default BookingInfoPage;
