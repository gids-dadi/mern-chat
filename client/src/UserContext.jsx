import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [loggedInUserName, setLoggedInUserName] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get("/api/users/profile").then((response) => {
      const { userDocs } = response.data;
      setId(userDocs._id);
      setLoggedInUserName(userDocs.username);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUserName,
        setLoggedInUserName,
        setId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
