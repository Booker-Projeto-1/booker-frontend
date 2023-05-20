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
  // const response = await api.get("/me", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  const user = {
    name: "default",
    email: "estevao.ferreira@gmail.com",
    id: "1",
    createdAt: "13/03/2022"
  }
  return user;
}

export async function signUpRequest(data: SignUpRequestData) {
  const { name, email, password } = data;
  const response = await api.post("/signin", {
    name,
    email,
    password,
  });
  return response.data;
}