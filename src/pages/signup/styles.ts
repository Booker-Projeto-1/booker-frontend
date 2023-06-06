import styled from "styled-components";
import { FormLabel as FL, Input as UInput, FormControl as FC, FormErrorMessage as FE, FormHelperText as FH} from "@chakra-ui/react";

//If media 320px or less then apply the css below to the component
export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 2rem 20px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  gap: 1rem;
  
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
    /* height: 100%; */
    /* margin-top: 11.875rem; */
  }
`;

export const Input = styled(UInput)`
  width: 100% !important;
  height: 48px !important;
  /* margin-bottom: 10px !important; */
  padding: 0 20px !important;
  border-radius: 30px !important;
  border: 1px solid ${(props) => props.theme.palette.secondary.main} !important;
  background-color: ${(props) => props.theme.palette.common.white} !important;
  color: ${(props) => props.theme.textColor} !important;

  &::placeholder {
    color: ${(props) => props.theme.textColor};
  }
`;


export const Button = styled.button`
  width: 100%;
  /* height: 50px; */
  padding: 0.5rem;
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
  color: black !important;
`;

export const FormErrorMessage = styled(FE)`
  color: red !important;
`;

export const InputContainer = styled(FC)`
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  /* input { */
    /* height: 5rem !important; */
  /* } */
  /* align-items: space-between !important;
  justify-content: space-between !important; */
`;


export const FormLabel = styled(FL)`
`;
