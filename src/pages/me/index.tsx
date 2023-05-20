import { AuthContext } from "@/context/AuthContext";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { Button, Container, FormContainer, FormTitle, Input, InputContainer, FormErrorMessage, FormLabel } from "./styles";
import { getAPIClient } from "@/services/axios";
import Layout from "@/components/Layout";

const Me: NextPage = () => {

  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [phone, setPhone] = useState(user?.phone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await getAPIClient().put('/users', {
        name,
        lastname,
        email,
        password,
        phone
      });
      setSuccess(response.data.message);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  }

  const handleLastnameChange = (e: any) => {
    setLastname(e.target.value);
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  }



  const isErrorName = name === '';
  const isErrorLastname = lastname === '';
  const isErrorEmail = email === '';
  const isErrorPassword = password === '';
  const isErrorPhone = phone === '';
  const isError = isErrorName || isErrorLastname || isErrorEmail || isErrorPassword || isErrorPhone;

  return (
    <Layout>
      <Container>
        <FormContainer onSubmit={handleSubmit}>
          <FormTitle>Informações do usuário</FormTitle>
          <InputContainer>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              value={name}
              onChange={handleNameChange}
            />
            {isErrorName && <FormErrorMessage>Nome é obrigatório</FormErrorMessage>}
          </InputContainer>
          <InputContainer>
            <FormLabel htmlFor="lastname">Sobrenome</FormLabel>
            <Input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Sobrenome"
              value={lastname}
              onChange={handleLastnameChange}
            />
            {isErrorLastname && <FormErrorMessage>Sobrenome é obrigatório</FormErrorMessage>}
          </InputContainer>
          <InputContainer>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {isErrorEmail && <FormErrorMessage>Email é obrigatório</FormErrorMessage>}
          </InputContainer>
          <InputContainer>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={handlePasswordChange}
            />
            {isErrorPassword && <FormErrorMessage>Senha é obrigatório</FormErrorMessage>}
          </InputContainer>
          <InputContainer>
            <FormLabel htmlFor="phone">Telefone</FormLabel>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Telefone"
              value={phone}
              onChange={handlePhoneChange}
            />
            {isErrorPhone && <FormErrorMessage>Telefone é obrigatório</FormErrorMessage>}
          </InputContainer>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
          {success && <FormErrorMessage>{success}</FormErrorMessage>}
        </FormContainer>
      </Container>
      <Button type="submit" disabled={isError}>
        {loading ? 'Carregando...' : 'Salvar'}
      </Button>
    </Layout>
  );
};

export default Me;
