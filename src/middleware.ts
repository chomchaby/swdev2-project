export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/bookings",
    "/coworkingspaces/:id/bookings/:bookingId?", // :id for dynamic coworking space id, :bookingId? for optional booking id
  ],
};
