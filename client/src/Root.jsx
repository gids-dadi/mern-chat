import { useContext, useEffect, useState } from "react";
import Register from "./RegisterAndLogin";
import { UserContext } from "./UserContext";
import Chat from "./chat";
import axios from "axios";

export default function Root() {
  const { loggedInUserName, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loggedInUserName) {
    return <Chat />;
  }

  if (loggedInUserName === null && !loading) {
    return <Register />;
  }
}
