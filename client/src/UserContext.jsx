import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [loggedInUserName, setLoggedInUserName] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/profile").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ loggedInUserName, setLoggedInUserName, id, setId }}
    >
      {children}
    </UserContext.Provider>
  );
}
