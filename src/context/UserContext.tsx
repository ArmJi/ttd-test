import { UserContextType, User } from "../type/type";
import { PropsWithChildren, useState, createContext, useContext } from "react";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User>({
    url: "",
    email: "",
    password: "",
    companyName: "",
    taxID: 0,
    fullname: "",
    country: "",
    phoneNumber: 0,
    website: "",
    address: "",
    state: "",
    subDistrict: "",
    city: "",
    zipcode: 0,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext) as UserContextType;
};
