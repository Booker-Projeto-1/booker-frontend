import Header from "@/components/Header";
import { Wrapper, InputGroup, Input } from './style';
import { InputLeftElement, Flex, Center, Text, Box } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const AddBook = () => {
    return (
        <Flex w="100%">
            <Center w='100px' bg='green.500'>
                <Text>Box 1</Text>
            </Center>
            <Wrapper flex='1'>
                <Header />
                <InputGroup>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<Search2Icon color='gray.300' />}
                    />
                    <Input type='search' placeholder='Buscar livro' />
                </InputGroup>
            </Wrapper>
        </Flex>
    );
}

export default AddBook