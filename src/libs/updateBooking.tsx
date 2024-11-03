const updateBooking = async (
  id: string,
  bookingDate: Date,
  numOfRooms: number,
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookings/${id}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingDate: bookingDate,
        numOfRooms: numOfRooms,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update booking");
  }
  return await response.json();
};
export default updateBooking;
