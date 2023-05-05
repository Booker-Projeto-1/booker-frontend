import { AuthContext } from "@/context/AuthContext";
import { getAPIClient } from "@/services/axios";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useContext } from "react";
import {
  Button,
  Container,
  Form,
  Input,
  InputContainer,
  Logo,
  LogoContainer,
} from "./styles";

const Login: NextPage = () => {
  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (data: any) => {
    await signIn(data);
  };

  return (
    <Container>
      <LogoContainer>
        <Logo />
        <strong>
          <h1>BOOKER</h1>
        </strong>
      </LogoContainer>

      <Form onSubmit={handleSubmit}>
        <strong>
          <h1>Fazer Login</h1>
        </strong>
        <InputContainer>
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="password" type="password" placeholder="Senha" />
          <Button type="submit">Entrar</Button>
        </InputContainer>
        <p>
          Não tem conta?{" "}
          <Link href={"/siginup"}>
            <strong>Registre-se</strong>
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
