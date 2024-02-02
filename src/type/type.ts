export interface User {
    name: string;
    url: string;
  }
export type UserContextType = {
    user: User;
    setUser: (user: User) => void;
  };