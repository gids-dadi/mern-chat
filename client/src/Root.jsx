import { useContext } from "react";
import Register from "./RegisterAndLogin";
import { UserContext } from "./UserContext";
import Chat from "./chat";

export default function Root() {
  const { loggedInUserName, id } = useContext(UserContext);


  if (loggedInUserName) {
    return <Chat />;
  }

  return <Register />;
}
