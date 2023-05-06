import { AuthContext } from "@/context/AuthContext";
import { GetServerSideProps, NextPage } from "next";
import { useContext, useState } from "react";
import { Button, Container, Form, Input, InputContainer, Logo, LogoContainer, ULink } from "./styles";
import { getAPIClient } from "@/services/axios";
import { parseCookies } from "nookies";
import Link from "next/link";

const SignUp: NextPage = () => {
  const { signUp } = useContext(AuthContext);

  const handleSubmit = async (data: any) => {
    await signUp(data);
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
          <h1>Fazer Cadastro</h1>
        </strong>
        <InputContainer>
            <Input name="name" type="text" placeholder="Nome" />
            <Input name="lastname" type="text" placeholder="Sobrenome" />
            <Input name="email" type="email" placeholder="E-mail" /> 
            <Input name="password" type="password" placeholder="Senha" />
            <Input name="password_confirmation" type="password" placeholder="Confirme a senha" />
            <Input name="phone" type="text" placeholder="Telefone" /> 
            <Button type="submit">Cadastrar</Button>
        </InputContainer>
        <p>
          Já tem conta?{" "}
          <Link href={"/login"}>
            <strong>Entre</strong>
          </Link>
        </p>
      </Form>
    </Container>
  )
}

export default SignUp;

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