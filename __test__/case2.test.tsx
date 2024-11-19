//CoworkingSpaceCard should have coworking information

import { render, screen } from '@testing-library/react';
import CoWorkingSpaceCard from '@/components/CoWorkingSpaceCard';


describe('CoWorkingSpaceCard', () => {
  const mockData =     {
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

  it('should display an image', () => {
    render(<CoWorkingSpaceCard data={mockData} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it('should display the operating hours', () => {
    render(<CoWorkingSpaceCard data={mockData} />);
    expect(screen.getByText(/Operating Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/09:00AM-10:00PM/i)).toBeInTheDocument();
  });

  it('should display the address', () => {
    render(<CoWorkingSpaceCard data={mockData} />);
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/999/i)).toBeInTheDocument();
    expect(screen.getByText(/Bangkok/i)).toBeInTheDocument();
    expect(screen.getByText(/10400/i)).toBeInTheDocument();
  });

  it('should display the telephone number', () => {
    render(<CoWorkingSpaceCard data={mockData} />);
    expect(screen.getByText(/Tel/i)).toBeInTheDocument();
    expect(screen.getByText(/000-123-4567/i)).toBeInTheDocument();
  });
});
