import { UserContextType, User } from "../type/type";
import { PropsWithChildren, useState, createContext, useContext } from "react";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User>({
    name: "",
    url: "",
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
