import styled from "styled-components";
import { InputGroup as InputGroupChakra, Input as InputChakra, Box } from '@chakra-ui/react';

export const Wrapper = styled(Box)`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #B2B1B1;
    min-height: 100vh;
    align-items: center;
`;

export const InputGroup = styled(InputGroupChakra)`
    width: 100%;
    max-width: 25rem;
    border: none;
`;

export const Input = styled(InputChakra)`
    background-color: #fff !important;
    border: none !important;
    border-radius: 2rem !important;
`;