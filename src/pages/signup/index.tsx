import { AuthContext } from "@/context/AuthContext";
import { GetServerSideProps, NextPage } from "next";
import { useContext, useState } from "react";
import { Button, Container, Form, Input, InputContainer, FormHelperText, Logo, LogoContainer, FormErrorMessage, FormLabel } from "./styles";
import { getAPIClient } from "@/services/axios";
import { parseCookies } from "nookies";
import Link from "next/link";

const SignUp: NextPage = () => {
  const { signUp } = useContext(AuthContext);

  const handleSubmit = async (data: any) => {
    await signUp(data);
  };

  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleNameChange = (e: any) => {
    setName(e.target.value)
  }

  const handleLastnameChange = (e: any) => {
    setLastname(e.target.value)
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value)
  }

  const isErrorName = name === '';
  const isErrorLastname = lastname === '';
  const isErrorEmail = email === '';
  const isErrorPassword = password === '';
  const isErrorPhone = phone === '';
  const isError = isErrorName || isErrorLastname || isErrorEmail || isErrorPassword || isErrorPhone;


  return (
    <Container>
      <LogoContainer>
        <Logo />
        <strong>
          <h1>BOOKER</h1>
        </strong>
      </LogoContainer>
      <Form onSubmit={handleSubmit}>
        <FormLabel>Fazer Cadastro</FormLabel>
        <InputContainer isInvalid={isErrorName}>
          <Input placeHolder="Nome" type="text" value={name} onChange={handleNameChange} />
          {!isErrorName ? (
            null
          ) : (
            <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorLastname}>
          <Input placeHolder="Sobrenome" type="text" value={lastname} onChange={handleLastnameChange} />
          {!isErrorLastname ? (
            null
          ) : (
            <FormErrorMessage>Sobrenome é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorEmail}>
          <Input placeHolder="Email" type="email" value={email} onChange={handleEmailChange} />
          {!isErrorEmail ? (
            null
          ) : (
            <FormErrorMessage>Email é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorPassword}>
          <Input placeHolder="Senha" type="password" value={password} onChange={handlePasswordChange} />
          {!isErrorPassword ? (
            null
          ) : (
            <FormErrorMessage>Senha é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorPhone}>
          <Input placeHolder="Telefone" type="text" value={phone} onChange={handlePhoneChange} />
          {!isErrorPhone ? (
            null
          ) : (
            <FormErrorMessage>Telefone é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <Button type="submit" disabled={isError}>
          Cadastrar
        </Button>
        {!isError ? (
          null
        ) : (
          <FormErrorMessage>Por favor, preencha todos os campos.</FormErrorMessage>
        )}
        <p>
          Possui uma conta?{" "}
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