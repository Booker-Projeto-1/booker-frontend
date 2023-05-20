import React from 'react';
import { Drawer, useDisclosure, DrawerOverlay, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Sidebar from '../Sidebar';
import Logo from '../Logo';
import { Box, IconButton, DrawerBody, DrawerCloseButton, DrawerContent } from './style';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)

    return (
        <>
            <Box>
                <IconButton ref={btnRef} isRound icon={<HamburgerIcon color="black" />} onClick={onOpen}/>
                <Logo flex="1" />
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Sidebar />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Header;