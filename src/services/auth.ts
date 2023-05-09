import { api } from "./api";

type SignInRequestData = {
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
  const response = await api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
