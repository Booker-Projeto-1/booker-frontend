import styled from "styled-components";
import { InputGroup as InputGroupChakra, Input as InputChakra, Box, CardBody as CardBodyChakra, Image as ImageChakra } from '@chakra-ui/react';

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

export const BookInfoBox = styled(Box)`
    position: absolute;
    bottom: 0;
    border-radius: 0.3rem;
    padding: 0.5rem;
    background: rgba(256, 256, 256, 0.7);
    width: 100%;
    right: 0;
`;

export const CardBody = styled(CardBodyChakra)`
    padding: 0 !important;
    width: 100%;
    height: 100%;
`;

export const Image = styled(ImageChakra)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.3rem;
`;

export const CardsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;