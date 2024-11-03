const createBooking = async (
  coworkingspaceId: string,
  bookingDate: Date,
  numOfRooms: number,
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/coworkingspaces/${coworkingspaceId}/bookings`,
    {
      method: "POST",
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
    throw new Error("Failed to create booking");
  }
  return await response.json();
};
export default createBooking;
