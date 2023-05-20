import styled from "styled-components";
import { FormLabel as FL, Input as UInput, FormControl as FC, FormErrorMessage as FE, FormHelperText as FH } from "@chakra-ui/react";
import { Form } from "../login/styles";

//If media 320px or less then apply the css below to the component
export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  overflow: auto;

  @media (max-width: 300px) {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const FormTitle = styled.h1`
  width: 100%;
  color: black;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: start;
`;


export const FormContainer = styled(Form)`
  width: 70%;
  max-width: 100%;
  box-shadow: none;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.palette.secondary.main};
  @media (max-width: 500px) {
    padding: 2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;


export const FormLabel = styled(FL)`
  color:  ${(props) => props.theme.palette.darker.main};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const Input = styled(UInput)`
  background-color: ${(props) => props.theme.palette.common.white}!important;
  border-radius: 30px !important;
  height: 3rem !important;
  padding: 0 1rem !important;
  color: ${(props) => props.theme.palette.darker.main}!important;
  font-weight: 400!important;
  font-size: 1rem!important;
  &::placeholder {
    color: ${(props) => props.theme.palette.darker.main}!important;
  }
`;

export const FormControl = styled(FC)`
  margin-bottom: 1rem;
`;

export const FormErrorMessage = styled(FE)`
  color: ${(props) => props.theme.palette.common.white};
  font-size: 0.75rem;
`;

export const FormHelperText = styled(FH)`
  color: ${(props) => props.theme.palette.common.white};
  font-size: 0.75rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  width: 40%;
  height: 3rem;
  background-color: ${(props) => props.theme.palette.darker.main};
  color: ${(props) => props.theme.palette.common.white};
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`;


