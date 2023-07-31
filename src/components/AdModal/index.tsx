import { updateAdRequest, updateAdRequestData } from "@/services/advertisement";
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
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import PButton from "../Button";
import { AlertContainer, SpaceBetweenButtons, AlertContent, PopInput } from "./styles";
import ReactHtmlParser from 'react-html-parser';

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
  const [loanUsername, setLoanUsername] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [redirectToWhatsApp, setRedirectToWhatsApp] = useState(false);


  const handleWhatsAppButtonClick = () => {
    setShowAlert(true);
  };

  const handleWhatsAppAlertResponse = (response: any) => {
    if (response) {
      window.open(`https://wa.me/${ad.phoneNumber}`);
    }
    setShowAlert(false);
  };

  const toast = useToast();

  const capitalizeWords = (str: string) => {
    if (str) {
      return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else return "";
  };

  const handleUpdateAd = (ad: updateAdRequestData) => {
    updateAdRequest(ad)
      .then(() => {
        toast({
          title: "Anúncio atualizado",
          status: "success",
          isClosable: true,
        });

        onCloseFunction();
      })
      .catch(() =>
        toast({
          title: "Erro ao atualizar anúncio",
          status: "error",
          isClosable: true,
        })
      );
  }

  const handleLoan = async (data: any) => {
    const bDate = new Date(data.beginDate)
    const eDate = new Date(data.endDate)
    const formattedBeginDate = bDate.toLocaleDateString('pt-br')
    const formattedEndDate = eDate.toLocaleDateString('pt-br')
    const newLoanRequestData = {
      borrowerUsername: capitalizeWords(data.userFullName),
      advertisementId: data.advertisementId,
      beginDate: formattedBeginDate,
      endDate: formattedEndDate
    }
    newLoanRequest(newLoanRequestData)
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
          {selfAd ? "Meu Anúncio" : "Anúncio de " + capitalizeWords(ad.userFullName)}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <Flex gap="2rem" direction="column">
            <Flex gap="2rem" direction={{ base: "column", md: "row" }} alignItems={{ base: 'center', md: 'flex-start' }}>
              <Image
                w="40%"
                src={ad.book.imageLink || "book-default.png"}
                alt={ad.book.title}
              />
              <Flex
                w={{ base: "100%", md: "60%" }}
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
                  {ReactHtmlParser(ad.book.description)}
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
                        <Th>Data de devolução</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        ad.loans.map((loan) => (
                          <Tr>
                            <Td>{loan.borrowerUsername}</Td>
                            <Td>{loan.beginDate}</Td>
                            <Td>{loan.endDate}</Td>
                          </Tr>
                        ))
                      }
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          {selfAd ? (
            <Flex direction="row" gap="1rem" w="100%" justifyContent="flex-end">
              {
                ad.borrowed ? (
                  <PButton onClick={() => handleUpdateAd({
                    id: ad.id,
                    description: ad.description,
                    borrowed: !ad.borrowed,
                    active: ad.active
                  })}>Marcar como devolvido</PButton>
                ) : (
                  <Popover>
                    <PopoverTrigger>
                      <PButton>Emprestar livro para</PButton>
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
                            name="name"
                            onChange={(e) => setLoanUsername(e.target.value)}
                          />
                          <label>Data do empréstimo</label>
                          <Input
                            placeholder="Select Date and Time"
                            type="date"
                            onChange={(e) => setBeginDate(e.target.value)}
                          />
                          <label>Data de devolução</label>
                          <Input
                            placeholder="Select Date and Time"
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                          <Flex direction="row" gap="1rem">
                            <PButton
                              onClick={() =>
                                handleLoan({
                                  borrowerUsername: loanUsername,
                                  advertisementId: ad.id,
                                  beginDate,
                                  endDate
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
                )
              }
              <PButton onClick={() => handleUpdateAd({ id: ad.id, description: ad.description, active: !ad.active, borrowed: ad.borrowed })}>
                {ad.active ? 'Desativar anúncio' : 'Ativar anúncio'}
              </PButton>
            </Flex>
          ) : (
            <>
              {!redirectToWhatsApp && (
                <>
                  <Button
                    borderRadius="30px"
                    padding="1rem"
                    backgroundColor="#5D5D5D"
                    color="white"
                    onClick={handleWhatsAppButtonClick}
                  >
                    Pedir emprestado
                  </Button>

                  {showAlert && (
                    <AlertContainer space-between="true">
                      <AlertContent>
                        <p>Você deseja ser encaminhado para o WhatsApp?</p>
                        <SpaceBetweenButtons>
                          <Button
                            borderRadius="30px"
                            padding="1rem"
                            width="40%"
                            backgroundColor="#5D5D5D"
                            color="white"
                            onClick={() => handleWhatsAppAlertResponse(true)}
                          >
                            Sim
                          </Button>
                          <Button
                            borderRadius="30px"
                            width="40%"
                            padding="1rem"
                            backgroundColor="#5D5D5D"
                            color="white"
                            onClick={() => handleWhatsAppAlertResponse(false)}
                          >
                            Não
                          </Button>
                        </SpaceBetweenButtons>
                      </AlertContent>
                    </AlertContainer>
                  )}
                </>
              )}
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdModal;
