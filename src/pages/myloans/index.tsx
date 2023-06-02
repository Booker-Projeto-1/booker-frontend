import { useEffect, useState } from 'react';
import { InputLeftElement, Text, Card, Spinner, useToast, Button, Flex } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { getUserLoans } from '@/services/loans';

import { Loans, Loan } from '@/types/types';
import Layout from "@/components/Layout";

import { InputGroup, Input, BookInfoBox, CardBody, Image, CardsWrapper } from './style';
import LoanModal from '@/components/LoanModal';
import googleBooksService from '@/services/googleBooksService';

import Router from 'next/router';

const defaultBook = { id: "", title: "", authors: [], publisher: "", description: "", imageLink: "" }
const MyLoans = () => {

    const [data, setData] = useState<Loans>([]);
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<Loan>({ 
        id: 1,
        lender: "",
        borrower: "",
        bookId: "",
        begin: "",
        end: "", 
        book: defaultBook });
    
    const toast = useToast();

    useEffect(() => {
        setLoading(true);
        getUserLoans()
            .then((res) => {
                Promise.all(res.map(async (ad: any) => {
                    const response = await googleBooksService.getBookById(ad.bookId)
                    const book = {
                        id: response.id,
                        title: response.volumeInfo.title,
                        authors: response.volumeInfo.authors,
                        description: response.volumeInfo.description,
                        publisher: response.volumeInfo.publisher,
                        imageLink: response.volumeInfo.imageLinks && response.volumeInfo.imageLinks.thumbnail
                    }
                    // console.log
                    const resultAd = { ...ad, book }
                    return resultAd
                })).then((values) => {
                    setData(values);
                    setLoading(false);
                })
            })
            .catch(() => toast({
                title: "Erro ao carregar empréstimos",
                status: 'error',
                isClosable: true,
              }));
        

    }, []);

    const handleClickCard = (loan: Loan) => {
        setIsModalOpen(true);
        setSelectedLoan(loan);
    }

    return (
        <Layout title='Meus Empréstimos'>
                <CardsWrapper>
                    {
                        isLoading ? 
                            <Spinner />
                        :
                        data.length ? (
                            <>
                                {data.map((loan) => (
                                    <Card key={loan.id} cursor="pointer" w="10rem" h="12rem" onClick={() => handleClickCard(loan)}>
                                        <CardBody>
                                            <Image
                                                src={loan.book.imageLink || "book-default.png"}
                                                alt={loan.book.title}
                                            />
                                            <BookInfoBox>
                                                <Text fontSize="12px" fontWeight="bold">{loan.book.title.substring(0, 50)}</Text>
                                                <Text fontSize="10px">{`Emprestado por ${loan.lender}`}</Text>
                                            </BookInfoBox>
                                        </CardBody>
                                    </Card>
                                ))}
                                <LoanModal isOpen={isModalOpen} onCloseFunction={() => setIsModalOpen(false)} loan={selectedLoan}/>
                            </>
                        ) : (
                            <Text>Nenhum anúncio cadastrado</Text>
                        )
                    }
                </CardsWrapper>
        </Layout>
    );
}

export default MyLoans