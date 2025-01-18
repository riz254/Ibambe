import { userService } from "../services/user";
import { User } from "../types/user";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom"; // For routing

// define authentication context props
interface AuthContextProps {
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  authenticate: (
    authMode: "login" | "register",
    email: string,
    password: string
  ) => Promise<void>;
  logout: VoidFunction;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// create custom useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within auth provider");
  }
  return context;
}

// provide authentication context to children
export function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // check if user is logged in
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setUser(JSON.parse(user));
      setIsLoggedIn(true);
      navigate("/"); // Redirect if logged in
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // authenticate user
  async function authenticate(
    authMode: "login" | "register",
    email: string,
    password: string
  ) {
    try {
      setIsLoadingAuth(true);
      const response = await userService[authMode]({ email, password });

      if (response) {
        const { user, token } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);

        navigate("/"); // Redirect after successful login
      }
    } catch (error) {
      console.error("Authentication failed", error);
    } finally {
      setIsLoadingAuth(false);
    }
  }

  // logout user
  function logout() {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // provide context to children
  return (
    <AuthContext.Provider
      value={{
        isLoadingAuth,
        isLoggedIn,
        authenticate,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
