import { useContext, useEffect, useState } from "react";
import Register from "./RegisterAndLogin";
import { UserContext } from "./UserContext";
import Chat from "./chat";

export default function Root() {
  const { loggedInUserName } = useContext(UserContext);

  // if (loading) {
  //   return (
  //     <div className="flex mx-auto items-center">
  //       <span>Loading...</span>
  //     </div>
  //   );
  // }

  if (loggedInUserName == null) {
    return <Register />;
  }

  if (loggedInUserName) {
    return <Chat />;
  }
}
