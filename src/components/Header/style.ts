import styled from 'styled-components';
import { Box as BoxChakra, IconButton as IconButtonChakra } from '@chakra-ui/react';

export const Box = styled(BoxChakra)`
    width: 100%;
    display: flex;
`;

export const IconButton = styled(IconButtonChakra)`
    background-color: white;
    border-radius: 50%;
    padding: 0.25rem !important;
`;

export const Logo = styled.div`
    position: absolute;
    left: 50%;
`;