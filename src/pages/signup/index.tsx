import { AuthContext } from "@/context/AuthContext";
import { GetServerSideProps, NextPage } from "next";
import { useContext, useState } from "react";
import { Button, Container, Form, Input, InputContainer, FormErrorMessage, FormLabel } from "./styles";
import { getAPIClient } from "@/services/axios";
import { parseCookies } from "nookies";
import { useEffect } from 'react';
import Link from "next/link";
import { FormHelperText, useToast } from "@chakra-ui/react";

const SignUp: NextPage = () => {
  const { signUp } = useContext(AuthContext);
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });

  const { name, lastname, email, password, phone } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    changeIsError(e.target.name, e.target.value);
  };

  const changeIsError = (name: string, value: string) => {
    switch (name) {
      case "name":
        setIsErrorName(value === "");
        break;
      case "lastname":
        setIsErrorLastname(value === "");
        break;
      case "email":
        setIsErrorEmail(value === "");
        break;
      case "password":
        setIsErrorPassword(value === "");
        break;
      case "phone":
        const reg = /^(55[0-9]{2}(9?)[0-9]{8})$/;
        setIsErrorPhone(value === "" || !reg.test(value));
        break;
    }
  };

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorLastname, setIsErrorLastname] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorPhone, setIsErrorPhone] = useState(false);
  // const [isInvalidFormatPhone, setIsInvalidFormatPhone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(formData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,  
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const isError = isErrorName || isErrorLastname || isErrorEmail || isErrorPassword || isErrorPhone;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormLabel>Fazer Cadastro</FormLabel>
        <InputContainer isInvalid={isErrorName}>
          <Input name="name" placeholder="Nome" type="text" value={name} onChange={handleChange} />
          {isErrorName && <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorLastname}>
          <Input name="lastname" placeholder="Sobrenome" type="text" value={lastname} onChange={handleChange} />
          {isErrorLastname && <FormErrorMessage>Sobrenome é obrigatório.</FormErrorMessage>}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorEmail}>
          <Input name="email" placeholder="Email" type="email" value={email} onChange={handleChange} />
          {isErrorEmail && <FormErrorMessage>Email é obrigatório.</FormErrorMessage>}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorPassword}>
          <Input name="password" placeholder="Senha" type="password" value={password} onChange={handleChange} />
          {isErrorPassword && <FormErrorMessage>Senha é obrigatório.</FormErrorMessage>}
        </InputContainer>
        <InputContainer isRequired isInvalid={isErrorPhone}>
          <Input name="phone" placeholder="Telefone" type="tel" value={phone} onChange={handleChange}/>
          {isErrorPhone ? (
            <FormErrorMessage fontSize="0.7rem">O telefone deve conter apenas dígitos, com códigos de área e número. Exemplo: 5583912345678</FormErrorMessage>
          ) : (
            <FormHelperText fontSize="0.7rem">O telefone deve conter apenas dígitos, com códigos de área e número. Exemplo: 5583912345678</FormHelperText>
          )}
        </InputContainer>
        <Button type="submit" disabled={isError}>
          Cadastrar
        </Button>
        {isError && <FormErrorMessage>Por favor, preencha todos os campos.</FormErrorMessage>}
        <p>
          Possui uma conta?{" "}
          <Link href="/login">
            <strong>Entre</strong>
          </Link>
        </p>
      </Form>
    </Container>
  );
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
