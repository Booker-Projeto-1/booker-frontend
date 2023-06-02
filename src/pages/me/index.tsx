import { AuthContext } from "@/context/AuthContext";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { Button, Container, FormContainer, FormTitle, Input, InputContainer, FormLabel } from "./styles";
import { getAPIClient } from "@/services/axios";
import Layout from "@/components/Layout";
import { useToast } from "@chakra-ui/react";


const Me: NextPage = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setlastName] = useState(user?.lastName || "");
  const [email] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setlastName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    return firstName !== "" && lastName !== "" && phoneNumber !== "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await getAPIClient().put("/users", {
        firstName,
        lastName,
        phoneNumber,
        email
      });
      toast({
        title: "Sucesso",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar as informações do usuário.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Container>
        <FormContainer onSubmit={handleSubmit}>
          <FormTitle>Informações do usuário</FormTitle>
          <InputContainer>
            <FormLabel htmlFor="firstName">Nome</FormLabel>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Nome"
              value={firstName}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <FormLabel htmlFor="lastName">Sobrenome</FormLabel>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Sobrenome"
              value={lastName}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              disabled={true}
            />
          </InputContainer>
          <InputContainer>
            <FormLabel htmlFor="phoneNumber">Telefone</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Telefone"
              value={phoneNumber}
              onChange={handleInputChange}
            />
          </InputContainer>
          <Button type="submit" disabled={!validateForm()}>
            Salvar
          </Button>
        </FormContainer>
      </Container>
    </Layout>
  );
};

export default Me;
