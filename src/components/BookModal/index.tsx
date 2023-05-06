import { Book } from "@/types/types";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, Button, Image, Flex } from "@chakra-ui/react";

interface BookModalProps {
    isOpen: boolean,
    onCloseFunction: () => void,
    book: Book
}

const BookModal = ({ isOpen, onCloseFunction, book }: BookModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onCloseFunction} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{book.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody w="100%">
                    <Flex direction="column" gap="2rem">
                        <Flex alignItems="flex-start" gap="1rem">
                            <Image w="20%" src={book.imageLink || "book-default.png"} alt={book.title} />
                            <Text w="100%">{book.description}</Text>
                        </Flex>
                        <Text>{`Autor(es): ${book.authors.join(", ")}`}</Text>
                        <Text>{`Editora: ${book.publisher}`}</Text>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button borderRadius="30px" padding="1rem" backgroundColor="#5D5D5D" color="white" onClick={onCloseFunction}>
                        Adicionar livro
                    </Button>
                    {/* <Button variant='ghost'>Secondary Action</Button> */}
                </ModalFooter>
            </ModalContent>
      </Modal>     
    );
};

export default BookModal;