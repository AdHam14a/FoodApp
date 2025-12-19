import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "react-toastify";

export interface UserData {
  userName: string;
  userEmail: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

interface AuthContextType {
  loggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  userData: UserData | null;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: Props) => {
  
  const [userData, setUserData] = useState<UserData | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return jwtDecode<UserData>(token);
      } catch {
        localStorage.removeItem("token");
        return null;
      }
    }
    return null;
  });

  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("token") !== null;
  });

  const [loading] = useState(false); 



  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode<UserData>(token);
    setUserData(decoded);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setLoggedIn(false);
    toast.success("You've logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, loading, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
