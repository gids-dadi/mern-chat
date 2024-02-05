import { useContext } from "react";
import Register from "./Register";
import { UserContext } from "./UserContext";

export default function Root() {
  const { loggedInUserName, id } = useContext(UserContext);

  console.log(loggedInUserName);

  if (loggedInUserName) {
    return <h1>Logged In</h1>;
  }

  return <Register />;
}
