import { useState, createContext, Dispatch, SetStateAction } from 'react';

export type ContextUser = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export const UserContext = createContext<{
  currentUser: ContextUser | null;
  setCurrentUser: Dispatch<SetStateAction<ContextUser | null>>;
}>({
  currentUser: null,
  setCurrentUser: () => null,
});

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<ContextUser | null>(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
