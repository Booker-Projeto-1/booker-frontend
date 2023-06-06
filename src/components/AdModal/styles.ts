import styled from "styled-components";

export const PopInput = styled.input`
  width: 100%;
  height: 2.5rem;
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
