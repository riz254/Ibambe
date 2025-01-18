import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import Footer from "../components/Footer";

const Login = () => {
  const { authenticate, isLoadingAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authenticate("login", email, password);
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div
      className="bg-purple-200  bg-cover bg-center bg-no-repeat absolute w-full h-fit "
      style={{ backgroundImage: `url('/download (2).jpeg')` }}
    >
      <Navbar />

      <div className=" mt-10 flex justify-center items-center min-h-screen ">
        <div className="my-auto bg-purple-300 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md font-sans"
                disabled={isLoadingAuth}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                disabled={isLoadingAuth}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md"
              disabled={isLoadingAuth}
            >
              {isLoadingAuth ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-600">
              Don't have an Account ? Sign Up Here
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
