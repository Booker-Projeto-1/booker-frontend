import { AuthContext } from "@/context/AuthContext";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { Button, Container, FormContainer, FormTitle, Input, InputContainer, FormErrorMessage, FormLabel } from "./styles";
import { getAPIClient } from "@/services/axios";
import Layout from "@/components/Layout";

const Me: NextPage = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const validateForm = () => {
    return name !== "" && lastname !== "" && phone !== "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await getAPIClient().put("/users", {
        name,
        lastname,
        phone,
      });
      setSuccess(response.data.message);
    } catch (error) {
      setError("Ocorreu um erro ao atualizar as informações do usuário.");
    } finally {
      setLoading(false);
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
              onChange={handleNameChange}
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
              onChange={handleLastnameChange}
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
              onChange={handlePhoneChange}
            />
          </InputContainer>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
          {success && <FormErrorMessage>{success}</FormErrorMessage>}
          <Button type="submit" disabled={loading || !validateForm()}>
            {loading ? "Carregando..." : "Salvar"}
          </Button>
        </FormContainer>
      </Container>
    </Layout>
  );
};

export default Me;