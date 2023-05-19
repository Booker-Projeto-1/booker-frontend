import { Box, Button } from '@chakra-ui/react';
import styled from 'styled-components';

export const Wrapper = styled(Box)`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    width: 100%;
    gap: 1rem;
`;

export const SidebarButton = styled(Button)`
    border-radius: 0 !important;
    border: 1px solid ${(props) => props.theme.palette.primary.main} !important;
    background-color: ${(props) => props.theme.palette.common.white} !important;
    justify-content: start !important;
    &:hover {
        background-color: ${(props) => props.theme.palette.primary.main} !important;
    }
`;

export const SidebarButtonGroup = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
    .sidebarbutton + .sidebarbutton {
        border-top: none !important;    
    }
`;