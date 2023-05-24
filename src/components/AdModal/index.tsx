import { Ad } from "@/types/types";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, Button, Image, Flex, Input, Textarea, useToast, Link } from "@chakra-ui/react";
import { useState } from "react";
import { newAdRequest } from '@/services/advertisement';
import NextLink from 'next/link';

interface BookModalProps {
    isOpen: boolean,
    onCloseFunction: () => void,
    ad: Ad
}

const AdModal = ({ isOpen, onCloseFunction, ad }: BookModalProps) => {
    const [isBookSelected, setIsBookSelected] = useState(false);
    const [description, setDescription] = useState("");
    
    const toast = useToast();

    const handleClick = (createAdvertisement: boolean) => {
        if (createAdvertisement) {
            setIsBookSelected(false);
            newAdRequest({ bookId: ad.book.id, description }).then(() => toast({
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
                <ModalHeader>{`Anúncio de ${ad.userEmail}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody w="100%">
                    <Flex gap="2rem">
                        <Image w="40%" src={ad.book.imageLink || "book-default.png"} alt={ad.book.title} />
                        <Flex w="60%" alignItems="flex-start" gap="1rem" direction="column">
                            <Text><b>{ad.book.title}</b></Text>
                            <Text><b>Descrição do anúncio: </b>{ad.description}</Text>
                            <Text><b>Descrição do livro: </b>{ad.book.description}</Text>
                            <Text><b>Autor(es): </b>{ad.book.authors.join(", ")}</Text>
                            <Text><b>Editora: </b>{ad.book.publisher || '-'}</Text>
                        </Flex>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <NextLink href={`https://wa.me/${ad.phoneNumber}`} passHref>
                        <Button borderRadius="30px" padding="1rem" backgroundColor="#5D5D5D" color="white" as="a">
                            Pedir emprestado
                        </Button>
                    </NextLink>
                </ModalFooter>
            </ModalContent>
    </Modal>
    );
};

export default AdModal;