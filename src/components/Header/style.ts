import styled from 'styled-components';
import { 
    Box as BoxChakra,
    IconButton as IconButtonChakra,
    DrawerContent as DrawerContentChakra,
    DrawerCloseButton as DrawerCloseButtonChakra,
    DrawerBody as DrawerBodyChakra
} from '@chakra-ui/react';

export const Box = styled(BoxChakra)`
    width: 100%;
    display: flex;
`;

export const IconButton = styled(IconButtonChakra)`
    background-color: white;
    border-radius: 50%;
    padding: 0.25rem !important;
    @media (min-width: 800px) {
        display: none !important;
    }
`;

export const Logo = styled.div`
    flex: 1;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

export const DrawerContent = styled(DrawerContentChakra)`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

export const DrawerCloseButton = styled(DrawerCloseButtonChakra)`
    position: relative;
`;

export const DrawerBody = styled(DrawerBodyChakra)`
    width: 100%;
    padding: 0 !important;
`;