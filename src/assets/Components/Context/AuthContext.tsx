import { createContext, useEffect, useState, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  userData: any;
  saveUserData: () => void;
}

export const authContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userData, setUserData] = useState<any>(null);

  const saveUserData = () => {
    const encodedToken: any = localStorage.getItem("user");
    if (encodedToken) {
      const decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
      // Store the decoded token in localStorage for refresh persistence
      localStorage.setItem("userData", JSON.stringify(decodedToken));
    }
  };

  useEffect(() => {
    // Check localStorage on component mount
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else if (localStorage.getItem("user")) {
      saveUserData(); // Decode and save if not already stored
    }
  }, []);

  return (
    <authContext.Provider value={{ saveUserData, userData }}>
      {children}
    </authContext.Provider>
  );
}
