import Logo from "@/components/Logo";
import { AuthContext } from "@/context/AuthContext";
import { getAPIClient } from "@/services/axios";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { isMobile } from "react-device-detect";

import { Button, Container, Form, Input, InputContainer } from "./styles";
import { useToast } from "@chakra-ui/react";

const Login: NextPage = () => {
  const { signIn } = useContext(AuthContext);

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    try {
      await signIn(data);
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro durante o login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Logo showName={!isMobile} />
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
          <Link href={"/signup"}>
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
