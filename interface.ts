interface CoWorkingSpaceItem {
  _id: string;
  name: string;
  opertingHours: string;
  address: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
}

interface CoWorkingSpaceJson {
  success: boolean;
  data: CoWorkingSpaceItem;
}

interface CoWorkingSpacesJson {
  success: boolean;
  data: CoWorkingSpaceItem[];
}

interface BookingItem {
  bookingDate: string;
  numOfRooms: number;
  user: string;
  coworkingspace: {
    _id: string;
    name: string;
    address: string;
    tel: string;
    id: string;
  };
  createdAt: string;
  __v: number;
}

interface BookingJson {
  success: boolean;
  data: BookingItem;
}

interface BookingsJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}
