import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const {setUser} = useContext(UserContext)

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/api/user/login", {email,password,});
      setUser(response.data)
      alert(`Welcome ${response.data.name},`);
      
      if (response.status == 200) 
        setRedirect(true);

    } catch (err) {
        alert("Something went wrong \n" + err.response.data.message);
    }
  }

  if (redirect) 
    return <Navigate to={"/"} />;

  return (
    <div className="mt-4 grow flex items-center justify-around  ">
      <div className="mb-32 ">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Dont have an account yet?
            <Link to={"/register"} className="pl-1 underline text-black ">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
