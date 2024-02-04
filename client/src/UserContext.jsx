import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [loggedInUserName, setLoggedInUserName] = useState(null);
  const [id, setId] = useState(null);


  return (
    <UserContext.Provider
      value={{ loggedInUserName, setLoggedInUserName, id, setId }}
    >
      {children}
    </UserContext.Provider>
  );
}
