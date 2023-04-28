import { Box, IconButton, Logo } from './style';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Drawer, DrawerBody, DrawerHeader, DrawerCloseButton, useDisclosure, DrawerOverlay, DrawerContent, DrawerFooter, Input, Button } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)

    return (
        <>
            <Box>
                <IconButton ref={btnRef} isRound icon={<HamburgerIcon color="black" />} onClick={onOpen}/>
                <Logo>
                    BOOKER
                </Logo>
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
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody>
                <Input placeholder='Type here...' />
                </DrawerBody>

                <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        </>
    );
};

export default Header;