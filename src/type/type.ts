export interface User {
    url: string;
    email: string;
    password: string;
    companyName: string;
    taxID: number;
    fullname: string;
    country: string;
    phoneNumber: number;
    website: string;
    address: string;
    state: string;
    subDistrict: string;
    city: string;
    zipcode: number;
  }
export type UserContextType = {
    user: User;
    setUser: (user: User) => void;
  };