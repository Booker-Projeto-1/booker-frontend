import Header from "@/components/Header";
import { Wrapper, InputGroup, Input } from './style';
import { InputLeftElement, Flex, Center, Text, Box } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import Sidebar from "@/components/Sidebar";
import Layout from "@/components/Layout";

const AddBook = () => {
    return (
        <Layout>
            <>
                <InputGroup>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<Search2Icon color='gray.300' />}
                    />
                    <Input type='search' placeholder='Buscar livro' />
                </InputGroup>
            </>
        </Layout>
    );
}

export default AddBook