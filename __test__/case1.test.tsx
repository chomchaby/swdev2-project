import { render, screen, fireEvent } from "@testing-library/react";
import ReserveCoWorkingSpace from "@/components/ReserveCoWorkingSpace";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/libs/createBooking", () => jest.fn());

describe("ReserveCoWorkingSpace", () => {
  const mockCoWorkingSpace = {
    data: { id: 1, name: "Mock Co-Working Space" },
  };

  const mockRouterPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

  const mockSession = {
    user: { token: "mock-token" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows error if no booking date or number of rooms is selected", async () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });

    render(<ReserveCoWorkingSpace coWorkingSpace={mockCoWorkingSpace} />);

    fireEvent.click(screen.getByText("Make Booking"));

    expect(
      await screen.findByText(
        "Please select a booking date and number of rooms."
      )
    ).toBeInTheDocument();
  });
});
