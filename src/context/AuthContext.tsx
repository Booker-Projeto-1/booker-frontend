import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";

import { api } from "../services/api";
import { recoverUserInformation, signInRequest, signUpRequest } from "../services/auth";
import { type } from "os";

type User = {
  name: string;
  email: string;
  id: string;
  createdAt: string;
} | null;

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
      recoverUserInformation(token).then((response: any) => {
        setUser(response.user);
      });
    } else {
      Router.push("/login");
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 6, // 6 hours
    });
    api.defaults.headers.common["Authorization"] = `${token}`;

    setUser(user);
    Router.push("/ads");
  }

  async function signOut() {
    setUser(null);
    destroyCookie(undefined, "nextauth.token");
    api.defaults.headers.common["Authorization"] = '';
    Router.push("/login");
  }

  async function signUp({ name, lastname, email, password, phone }: SignUpData) {
    const res = await signUpRequest({ name, lastname, email, password, phone });
    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
