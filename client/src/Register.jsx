import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function Register() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedInUserName, setId } = useContext(UserContext);

  async function handleRegisterUser(e) {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:5000/api/users", {
      name,
      userName,
      email,
      password,
    });
    setLoggedInUserName(userName);
    setId(data.id);
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleRegisterUser}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" block w-full p-2 mb-2   border"
        />
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className=" block w-full p-2 mb-2   border"
        />

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" block w-full p-2 mb-2   border"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-2  border "
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
      </form>
    </div>
  );
}
