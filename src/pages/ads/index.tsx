import { useEffect, useState } from 'react';
import { InputLeftElement, Text, Card, Spinner, useToast } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { getAds } from '@/services/advertisement';

import { Ads, Ad } from '@/types/types';
import Layout from "@/components/Layout";

import { InputGroup, Input, BookInfoBox, CardBody, Image, CardsWrapper } from './style';
import AdModal from '@/components/AdModal';
import googleBooksService from '@/services/googleBooksService';

const defaultBook = { id: "", title: "", authors: [], publisher: "", description: "", imageLink: "" }
const Ads = () => {

    const [data, setData] = useState<Ads>([]);
    const [isLoading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAd, setSelectedAd] = useState<Ad>({ id: 1, userEmail: "", active: false, bookId: "", borrowed: false, description: "", phoneNumber: "", book: defaultBook });
    
    const toast = useToast();

    useEffect(() => {
        setLoading(true);
        getAds()
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
   
                    const resultAd = { ...ad, book }
                    return resultAd
                })).then((values) => setData(values))
            })
            .catch(() => toast({
                title: "Erro ao carregar anúncios",
                status: 'error',
                isClosable: true,
              }));
        
        setLoading(false);

    }, []);

    const handleClickCard = (ad: Ad) => {
        setIsModalOpen(true);
        setSelectedAd(ad);
    }

    return (
        <Layout>
            <>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Search2Icon color='gray.300' />}
                    />
                    <Input type='search' placeholder='Buscar anúncio' value={query} onChange={(e: any) => console.log(e)}/>
                </InputGroup>
                <CardsWrapper>
                    {
                        isLoading ? 
                            <Spinner />
                        :
                        data.length ? (
                            <>
                                {data.map((ad) => (
                                    <Card key={ad.id} cursor="pointer" w="10rem" h="12rem" onClick={() => handleClickCard(ad)}>
                                        <CardBody>
                                            <Image
                                                src={ad.book.imageLink || "book-default.png"}
                                                alt={ad.book.title}
                                            />
                                            <BookInfoBox>
                                                <Text fontSize="12px" fontWeight="bold">{ad.book.title.substring(0, 50)}</Text>
                                                <Text fontSize="10px">{`Anunciado por ${ad.userEmail}`}</Text>
                                            </BookInfoBox>
                                        </CardBody>
                                    </Card>
                                ))}
                                <AdModal isOpen={isModalOpen} onCloseFunction={() => setIsModalOpen(false)} ad={selectedAd}/>
                            </>
                        ) : (
                            <Text>Pesquise um livro para adicionar ao anúncio</Text>
                        )
                    }
                </CardsWrapper>
            </>
        </Layout>
    );
}

export default Ads