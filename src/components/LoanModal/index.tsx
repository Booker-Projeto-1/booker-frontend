import { Book, Loan } from "@/types/types";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, Button, Image, Flex, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";

interface LoanModalProps {
    isOpen: boolean,
    onCloseFunction: () => void,
    loan: Loan
}

const BookModal = ({ isOpen, onCloseFunction, loan }: LoanModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onCloseFunction} scrollBehavior="inside" size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{loan.book.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody w="100%">
                    <Flex gap="2rem">
                        <Image w="40%" src={loan.book.imageLink || "book-default.png"} alt={loan.book.title} />
                        <Flex w="60%" alignItems="flex-start" gap="1rem" direction="column">
                            <Text><b>Emprestado por: </b>{loan.lender}</Text>
                            <Text>{`Data de empréstimo: ${loan.begin}`}</Text>
                            <Text>{`Data de devolução: ${loan.end || '-'}`}</Text>
                            <Text>{loan.book.description}</Text>
                            <Text>{`Autor(es): ${loan.book.authors.join(", ")}`}</Text>
                            <Text>{`Editora: ${loan.book.publisher || '-'}`}</Text>
                        </Flex>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button borderRadius="30px" padding="1rem" backgroundColor="#5D5D5D" color="white" onClick={onCloseFunction}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
    </Modal>
    );
};

export default BookModal;