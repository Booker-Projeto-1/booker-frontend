import { Book } from "@/types/types";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, Button, Image, Flex, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { newAdRequest } from '@/services/advertisement';
import ReactHtmlParser from 'react-html-parser';

interface BookModalProps {
    isOpen: boolean,
    onCloseFunction: () => void,
    book: Book
}

const BookModal = ({ isOpen, onCloseFunction, book }: BookModalProps) => {
    const [isBookSelected, setIsBookSelected] = useState(false);
    const [description, setDescription] = useState("");
    
    const toast = useToast();

    const handleClick = (createAdvertisement: boolean) => {
        if (createAdvertisement) {
            setIsBookSelected(false);
            newAdRequest({ bookId: book.id, description }).then(() => toast({
                title: "Anúncio criado",
                status: 'success',
                isClosable: true,
              })).catch(() => toast({
                title: "Erro na criação do anúncio",
                status: 'error',
                isClosable: true,
              }));
            setDescription('');
            onCloseFunction();
        } else {
            setIsBookSelected(true);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onCloseFunction} scrollBehavior="inside" size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar anúncio</ModalHeader>
                <ModalCloseButton />
                <ModalBody w="100%">
                    {
                        isBookSelected ? 
                            <>
                                <Text mb="1rem">Descrição do anúncio:</Text>
                                <Textarea
                                    value={description}
                                    onChange={({ target }) => setDescription(target.value)}
                                    placeholder="Descreva informações que julga importante sobre o livro e o empréstimo"
                                    size="lg"
                                />
                            </>
                        : (
                            <Flex gap="2rem" direction={{ base: "column", md: "row" }} alignItems={{ base: 'center', md: 'flex-start' }}>
                                <Image w="40%" src={book.imageLink || "book-default.png"} alt={book.title} />
                                <Flex w={{ base: "100%", md: "60%" }} alignItems="flex-start" gap="1rem" direction="column">
                                    <Text>    
                                        <b>{book.title}</b>
                                    </Text>
                                    <Text>
                                        <b>Descrição do livro: </b>
                                        {ReactHtmlParser(book.description)}
                                    </Text>
                                    <Text>
                                        <b>Autor(es): </b>
                                        {book.authors.join(", ")}
                                    </Text>
                                    <Text>
                                        <b>Editora: </b>
                                        {book.publisher || '-'}
                                    </Text>
                                </Flex>
                            </Flex>
                        )
                    }
                </ModalBody>

                <ModalFooter>
                    <Button borderRadius="30px" padding="1rem" backgroundColor="#5D5D5D" color="white" onClick={() => handleClick(isBookSelected)}>
                        {isBookSelected ? 'Criar anúncio' : 'Selecionar livro'}
                    </Button>
                </ModalFooter>
            </ModalContent>
    </Modal>
    );
};

export default BookModal;