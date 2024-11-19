//Test missing requirement variable value 
import { render, screen, fireEvent } from "@testing-library/react";
import ReserveCoWorkingSpace from "@/components/ReserveCoWorkingSpace";
import { SessionProvider } from "next-auth/react";

const mockCoWorkingSpace = {
    success: true,
    data: {
      _id: "673ae3eff32addc35e78481e",
      name: "Caffeine House",
      operatingHours: "09:00AM-10:00PM",
      address: "999",
      province: "Bangkok",
      postalcode: "10400",
      tel: "000-123-4567",
      picture: "https://utfs.io/f/qx6c8Uni5OtBhvjPBgmJRPCHe5M3XwKYnrxILS4AmZTaofF1",
      __v: 0,
      id: "673ae3eff32addc35e78481e"
    }
  }

  // Mock the useRouter hook from next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(), 
      prefetch: jest.fn(),
    }),
  }));

const mockSession = {
  user: { token: "mockToken" },
};

describe("ReserveCoWorkingSpace Component", () => {
    it("shows an error if 'Make Booking' is clicked without filling required fields", async () => {
      render(
        <SessionProvider session={{ data: mockSession } as any}>
          <ReserveCoWorkingSpace coWorkingSpace={mockCoWorkingSpace} session={mockSession} />
        </SessionProvider>
      );
  
      const makeBookingButton = screen.getByText(/Make Booking/i);
      fireEvent.click(makeBookingButton);
  
      const errorMessage = await screen.findByText("Please select a booking date and number of rooms.");
      expect(errorMessage).toBeInTheDocument();
    });
  });
