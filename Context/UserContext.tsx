import React, { createContext, useState, useContext } from "react";

interface User {
  full_name: string;
}

interface UserContextValue {
  userData: User | null;
  setUserData: (userData: User | null) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

const UserProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

export { UserProvider, useUserContext };
