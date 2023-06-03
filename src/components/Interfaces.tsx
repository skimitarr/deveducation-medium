export type IRoomFromStore = {
  some: {
    allAccounts: Record<string, IAccount>;
    allRooms: IRoom[];
    isLoading: boolean;
  };
};

export type IItem = {
  Accounts: IAccount;
  Rooms: IRoom[];
}

export type IAccount = {
  image: string;
  password: string;
}

export type IRoom = {
  checkInDate: string;
  description: string;
  features: string[];
  gallery: string[];
  guest: string;
  id: string;
  isCheckedIn: boolean;
  number: number;
  occupancy: number;
  price: number;
  type: string;
};

export type ISomeSliceState = {
  allAccounts: Record<string, IAccount>;
  allRooms: IRoom[];
  isLoading: boolean;
}
