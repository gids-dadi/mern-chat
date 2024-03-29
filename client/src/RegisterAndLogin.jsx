import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginOrRegister, setLoginOrRegister] = useState("register");
  const { setLoggedInUserName, setId } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const url = loginOrRegister === "register" ? "" : "login";
    const { data } = await axios.post(`/api/users/${url}`, {
      username,
      password,
    });
    setLoggedInUserName(username);
    setId(data._id);
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" block w-full p-2 mb-2   border rounded-lg"
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-2  border rounded-lg "
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {loginOrRegister === "register" ? "Register" : "Login"}
        </button>

        <div className="text-center mt-2">
          {loginOrRegister === "register" && (
            <div>
              Already have an accout?{" "}
              <button
                className="text-blue-300"
                onClick={() => setLoginOrRegister("login")}
              >
                Login
              </button>
            </div>
          )}
          {loginOrRegister === "login" && (
            <div>
              Don't have an account?{" "}
              <button
                className="text-blue-300 rounded-lg"
                onClick={() => setLoginOrRegister("register")}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
