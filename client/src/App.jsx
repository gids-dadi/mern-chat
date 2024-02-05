import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Root from "./Root";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Root />
    </UserContextProvider>
  );
}

export default App;
