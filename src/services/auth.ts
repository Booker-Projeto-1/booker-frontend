import { api } from "./api";

type SignInRequestData = {
  email: string;
  password: string;
};

type SignUpRequestData = {
  name: string;
  email: string;
  password: string;
};

export async function signInRequest(data: SignInRequestData) {
  const { email, password } = data;
  const response = await api.post("/login", {
    email,
    password,
  });
  return response.data;
}

export async function recoverUserInformation(token: string) {
  const response = await api.post("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function signUpRequest(data: SignUpRequestData) {
  const { name, email, password } = data;
  const response = await api.post("/user", {
    name,
    email,
    password,
  });
  return response.data;
}