import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [loggedInUserName, setLoggedInUserName] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/users/profile").then((response) => {
      const { userDocs } = response.data;
      setId(userDocs._id);
      setLoggedInUserName(userDocs.userName);
    });
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUserName,
        setLoggedInUserName,
        setId,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
