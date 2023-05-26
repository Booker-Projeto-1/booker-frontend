import { newAdRequest } from "@/services/advertisement";
import { newLoanRequest } from "@/services/loan";
import { Ad } from "@/types/types";
import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import PButton from "../Button";
import { PopInput } from "./styles";

interface BookModalProps {
  isOpen: boolean;
  onCloseFunction: () => void;
  ad: Ad;
  selfAd?: boolean;
}

const AdModal = ({
  isOpen,
  onCloseFunction,
  ad,
  selfAd = false,
}: BookModalProps) => {
  const [isBookSelected, setIsBookSelected] = useState(false);
  const [description, setDescription] = useState("");
  const [loanEmail, setLoanEmail] = useState("");

  const toast = useToast();

  const handleClick = (createAdvertisement: boolean) => {
    if (createAdvertisement) {
      setIsBookSelected(false);
      newAdRequest({ bookId: ad.book.id, description })
        .then(() =>
          toast({
            title: "Anúncio criado",
            status: "success",
            isClosable: true,
          })
        )
        .catch(() =>
          toast({
            title: "Erro na criação do anúncio",
            status: "error",
            isClosable: true,
          })
        );
      setDescription("");
      onCloseFunction();
    } else {
      setIsBookSelected(true);
    }
  };

  const handleLoan = (data: any) => {
    newLoanRequest(data)
      .then(() =>
        toast({
          title: "Livro emprestado",
          status: "success",
          isClosable: true,
        })
      )
      .catch(() =>
        toast({
          title: "Erro ao emprestar livro",
          status: "error",
          isClosable: true,
        })
      );
    onCloseFunction();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseFunction}
      scrollBehavior="inside"
      size="5xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selfAd ? "Meu Anúncio" : "Anúncio de " + ad.userEmail}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <Flex gap="2rem" direction="column">
            <Flex gap="2rem">
              <Image
                w="40%"
                src={ad.book.imageLink || "book-default.png"}
                alt={ad.book.title}
              />
              <Flex
                w="60%"
                alignItems="flex-start"
                gap="1rem"
                direction="column"
              >
                <Text>
                  <b>{ad.book.title}</b>
                </Text>
                <Text>
                  <b>Descrição do anúncio: </b>
                  {ad.description}
                </Text>
                <Text>
                  <b>Descrição do livro: </b>
                  {ad.book.description}
                </Text>
                <Text>
                  <b>Autor(es): </b>
                  {ad.book.authors.join(", ")}
                </Text>
                <Text>
                  <b>Editora: </b>
                  {ad.book.publisher || "-"}
                </Text>
              </Flex>
            </Flex>
            {selfAd && (
              <Flex direction="column" gap="1rem">
                <Text fontWeight="bold">Histórico de Empréstimos</Text>
                <TableContainer>
                  <Table size="sm" variant="striped">
                    <Thead>
                      <Tr>
                        <Th>Usuário</Th>
                        <Th>Data de empréstimo</Th>
                        <Th>Status</Th>
                        <Th>Data de devolução</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>João</Td>
                        <Td>01/01/2021</Td>
                        <Td>Emprestado</Td>
                        <Td>01/02/2021</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          {selfAd ? (
            <Flex direction="row" gap="1rem">
              <Popover>
                <PopoverTrigger>
                  <PButton>Marcar como Emprestado</PButton>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Emprestar livro para</PopoverHeader>
                  <PopoverBody>
                    <Flex gap="0.5rem" direction="column">
                      <label>E-mail</label>
                      <PopInput
                        placeholder="E-mail do usuário"
                        name="email"
                        onChange={(e) => setLoanEmail(e.target.value)}
                      />
                      <Flex direction="row" gap="1rem">
                        <PButton
                          onClick={() =>
                            handleLoan({
                              borrowerEmail: loanEmail,
                              advertisementId: ad.id,
                              beginDate: '23/03/2024',
                              endDate: '23/04/2024'
                            })
                          }
                        >
                          Salvar
                        </PButton>
                      </Flex>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          ) : (
            <NextLink href={`https://wa.me/${ad.phoneNumber}`} passHref>
              <Button
                borderRadius="30px"
                padding="1rem"
                backgroundColor="#5D5D5D"
                color="white"
                as="a"
              >
                Pedir emprestado
              </Button>
            </NextLink>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdModal;
