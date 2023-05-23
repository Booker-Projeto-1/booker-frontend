import { api } from "./api";

export type SignInRequestData = {
  email: string;
  password: string;
};

export type SignUpRequestData = {
  name: string;
  email: string;
  password: string;
};

export async function signInRequest(data: SignInRequestData) {
  const { email, password } = data;
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to sign in");
  }
}

export async function recoverUserInformation(token: string) {
  try {
    const response = await api.get("/user/me", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to recover user information", error);
    return null;
  }
}

export async function signUpRequest(data: SignUpRequestData) {
  const { name, email, password } = data;
  try {
    const response = await api.post("/signin", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to sign up");
  }
}
