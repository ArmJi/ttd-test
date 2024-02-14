import { UserContextType, User } from "../type/type";
import { PropsWithChildren, useState, createContext, useContext, useEffect } from "react";

export const UserContext = createContext<UserContextType | null>(null);

const userData:User = JSON.parse(localStorage.getItem("userData") || "{}")

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User>(userData);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext) as UserContextType;
};
