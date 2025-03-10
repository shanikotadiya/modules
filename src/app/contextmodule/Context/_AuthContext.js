"use client";
import { createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
 const token="test"

  // now we can make here jwt token and login and logut logic
  return (
    <AuthContext.Provider value={ token }>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
