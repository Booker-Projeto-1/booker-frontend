import { AuthContext } from "@/context/AuthContext";
import { GetServerSideProps, NextPage } from "next";
import { useContext, useState } from "react";
import { Button, Container, Form, Input, InputContainer, Logo, LogoContainer, FormErrorMessage, FormLabel } from "./styles";
import { getAPIClient } from "@/services/axios";
import { parseCookies } from "nookies";
import { useEffect } from 'react';
import Link from "next/link";

const SignUp: NextPage = () => {
  const { signUp } = useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
    };
    try {
      await signUp(data);
    } catch (error) {
      console.log(error)
    }
  };

  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorLastname, setIsErrorLastname] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorPhone, setIsErrorPhone] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleNameChange = (e: any) => {
    if (!e.target.value) {
      setIsErrorName(true)
    } else if (e.target.value && isErrorName) {
      setIsErrorName(false)
    }
    setName(e.target.value)
  }

  const handleLastnameChange = (e: any) => {
    if (!e.target.value) {
      setIsErrorLastname(true)
    } else if (e.target.value && isErrorLastname) {
      setIsErrorLastname(false)
    }
    setLastname(e.target.value)
  }

  const handleEmailChange = (e: any) => {
    if (!e.target.value) {
      setIsErrorEmail(true)
    } else if (e.target.value && isErrorEmail) {
      setIsErrorEmail(false)
    }
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: any) => {
    if (!e.target.value) {
      setIsErrorPassword(true)
    } else if (e.target.value && isErrorPassword) {
      setIsErrorPassword(false)
    }
    setPassword(e.target.value)
  }

  const handlePhoneChange = (e: any) => {
    if (!e.target.value) {
      setIsErrorPhone(true)
    } else if (e.target.value && isErrorPhone) {
      setIsErrorPhone(false)
    }    
    setPhone(e.target.value)
  }

  useEffect(()=> {
    setIsError(isErrorName || isErrorLastname || isErrorEmail || isErrorPassword || isErrorPhone)
  }, [isErrorName, isErrorLastname, isErrorEmail, isErrorPassword, isErrorPhone]);
  // const [isErrorPhone, setIsErrorPhone] = useState(false);


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
          <Input name="name" placeholder="Nome" type="text" value={name} onChange={handleNameChange} />
          {!isErrorName ? (
            null
          ) : (
            <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorLastname}>
          <Input name="lastname" placeholder="Sobrenome" type="text" value={lastname} onChange={handleLastnameChange} />
          {!isErrorLastname ? (
            null
          ) : (
            <FormErrorMessage>Sobrenome é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorEmail}>
          <Input name="email" placeholder="Email" type="email" value={email} onChange={handleEmailChange} />
          {!isErrorEmail ? (
            null
          ) : (
            <FormErrorMessage>Email é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorPassword}>
          <Input name="password" placeholder="Senha" type="password" value={password} onChange={handlePasswordChange} />
          {!isErrorPassword ? (
            null
          ) : (
            <FormErrorMessage>Senha é obrigatório.</FormErrorMessage>
          )}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorPhone}>
          <Input name="phone" placeholder="Telefone" type="text" value={phone} onChange={handlePhoneChange} />
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