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

export const AlertContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
`;

export const AlertContent = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const SpaceBetweenButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
