import styled from "styled-components";
import { FormLabel as FL, Input as UInput, FormControl as FC, FormErrorMessage as FE, FormHelperText as FH} from "@chakra-ui/react";

//If media 320px or less then apply the css below to the component
export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;

  @media (max-width: 300px) {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const LogoContainer = styled.div`
  width: 8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin-top: 2rem;

  @media (max-width: 500px) {
    display: none;
  }
`;

export const Logo = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${(props) => props.theme.palette.darker.main};
  border-radius: 100%;
  @media (max-width: 500px) {
    height: 150px;
    width: 150px;
    background-color: ${(props) => props.theme.palette.darker.main};
    border-radius: 100%;
    padding: 5rem;
    margin: 5rem 0;
  }
`;

export const Form = styled.form`
  width: 100%;
  min-height: 30rem;
  max-width: 600px;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 2rem 20px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  
  h1 {
    color: ${(props) => props.theme.palette.primary.contrastText};
    font-size: large;
    margin-bottom: 25px
  }

  p {
    color: ${(props) => props.theme.palette.primary.contrastText};
    font-size: large;
    margin-top: 25px;
    
  }

  h1, p {
    @media (max-width: 500px) {
      margin: 0
    }
  }  
  @media (max-width: 500px) {
    width: 100%;
    max-width: 600px;
    height: 100%;
    margin-top: 11.875rem;
  }
`;

export const Input = styled(UInput)`
  width: 100%;
  height: 48px;
  margin-bottom: 10px;
  padding: 0 20px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.palette.secondary.main};
  background-color: ${(props) => props.theme.palette.common.white};
  color: ${(props) => props.theme.textColor};

  &::placeholder {
    color: ${(props) => props.theme.textColor};
  }
`;


export const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.palette.darker.main};
  background-color: ${(props) => props.theme.palette.darker.main};
  color: ${(props) => props.theme.palette.darker.contrastText};
  font-weight: bold;
  font-size: large;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

export const FormHelperText = styled(FH)`
  color: black;
`;

export const FormErrorMessage = styled(FE)`
  color: red;
`;

export const InputContainer = styled(FC)`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
`;


export const FormLabel = styled(FL)`
`;
