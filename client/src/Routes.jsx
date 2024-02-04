import { useContext } from "react";
import Register from "./Register";
import { UserContext } from "./UserContext";

export default function Routes() {
  const { loggedInUserName, id } = useContext(UserContext);
  console.log(loggedInUserName);

  // if (loggedInUserName) {
  //   return "Logged In";
  // }

  return <Register />;
}
