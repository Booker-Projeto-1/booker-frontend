import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";

import { api } from "../services/api";
import { recoverUserInformation, signInRequest, signUpRequest } from "../services/auth";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  phoneNumber: string;
} | null | undefined;


type SignUpData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
  signUp: (data: SignUpData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      recoverUserInformation(token).then((response) => {
        setUser(response);
      });
    }
  }, []);


  async function signIn({ email, password }: SignInData) {
    const { token } = await signInRequest({
      email,
      password,
    });

    recoverUserInformation(token).then((response) => {
      setUser(response);
    });

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 6, // 6 hours
    });
    api.defaults.headers.common["Authorization"] = `${token}`;

    Router.push("/ads");
  }

  async function signOut() {
    setUser(null);
    destroyCookie(undefined, "nextauth.token");
    api.defaults.headers.common["Authorization"] = '';
    Router.push("/login");
  }

  async function signUp({ name, lastname, email, password, phone }: SignUpData) {
    try {
      await signUpRequest({
        name,
        lastname,
        email,
        password,
        phone,
      });
      Router.push("/login");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
