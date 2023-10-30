import { createContext, useContext } from "react";

export type ContextProps = {
  login?: boolean;
  setLogin?: any;
  signup?: boolean;
  setSignup?: any;
  token?: string;
  setToken?: any;
}

export const AuthContext = createContext<ContextProps>({});

export const useAuthContext = () => useContext(AuthContext);