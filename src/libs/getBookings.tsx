const getBookings = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookings`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Error fetching bookings:", errorDetails);
    throw new Error("Cannot get booking list");
  }
  return await response.json();
};
export default getBookings;
