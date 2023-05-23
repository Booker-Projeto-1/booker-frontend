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

  const [name, setName] = useState(user?.name || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    return name !== "" && lastname !== "" && phone !== "";
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
        name,
        lastname,
        phone,
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
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              value={name}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <FormLabel htmlFor="lastname">Sobrenome</FormLabel>
            <Input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Sobrenome"
              value={lastname}
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
            <FormLabel htmlFor="phone">Telefone</FormLabel>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Telefone"
              value={phone}
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
