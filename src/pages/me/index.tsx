import { AuthContext } from "@/context/AuthContext";
import { NextPage } from "next";
import { useContext, useState, useEffect } from "react";
import { Button, Container, FormContainer, FormTitle, Input, InputContainer, FormLabel, FormControl } from "./styles";
import { getAPIClient } from "@/services/axios";
import Layout from "@/components/Layout";
import { FormHelperText, useToast } from "@chakra-ui/react";

const Me: NextPage = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const reg = /^(55[0-9]{2}(9?)[0-9]{8})$/;
    return firstName !== "" && lastName !== "" && phoneNumber !== "" && reg.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha os campos com valores válidos.",
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
        email,
      });

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPhoneNumber(response.data.phoneNumber);

      toast({
        title: "Sucesso",
        description: response.data.message,
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
          <FormControl>
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
              <FormHelperText fontSize="0.7rem">O telefone deve conter apenas dígitos, com códigos de área e número. Exemplo: 5583912345678</FormHelperText>
            </InputContainer>
          </FormControl>
          <Button type="submit" disabled={!validateForm()}>
            Salvar
          </Button>
        </FormContainer>
      </Container>
    </Layout>
  );
};

export default Me;
