import { getAds } from "@/services/advertisement";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  Flex,
  InputLeftElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import { Ad, Ads } from "@/types/types";

import AdModal from "@/components/AdModal";
import googleBooksService from "@/services/googleBooksService";
import {
  BookInfoBox,
  CardBody,
  CardsWrapper,
  Image,
  Input,
  InputGroup,
} from "./style";

import Router from "next/router";
import { capitalizeWords } from "@/util";

const defaultBook = {
  id: "",
  title: "",
  authors: [],
  publisher: "",
  description: "",
  imageLink: "",
};
const Ads = () => {
  const [data, setData] = useState<Ads>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad>({
    id: 1,
    userFullName: "",
    active: false,
    bookId: "",
    borrowed: false,
    description: "",
    phoneNumber: "",
    book: defaultBook,
    loans: []
  });
  
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    getAds(ids)
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
            })).then((values) => {
                setData(values);
                setLoading(false);
            })
        })
        .catch(() => toast({
            title: "Erro ao carregar anúncios",
            status: 'error',
            isClosable: true,
          }));
    }, [ids]);

    useEffect(() => {
        if (query) {
            const timeout = setTimeout(() => {
                setLoading(true);
                googleBooksService.searchBooks(query).then((res) => {
                    if (res.items) {
                        const responseData = res.items.map(({ id }: any) => (id));
                        setIds(responseData);
                    } else {
                        setIds([]);
                    }
    
                    setLoading(false);
                }).catch((err: any) => console.log(err));
            }, 500)

            return () => clearTimeout(timeout)    
        }
     
        return () => {}
    }, [query]);

  const handleClickCard = (ad: Ad) => {
    setIsModalOpen(true);
    setSelectedAd(ad);
  };

  return (
    <Layout title="Anúncios">
      <>
        <Flex w="100%" gap="1rem" justifyContent="center">
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                >
                    <Search2Icon color='gray.300' />
                </InputLeftElement>
                <Input type='search' placeholder='Buscar anúncio' value={query} onChange={(e: any) => setQuery(e.target.value)}/>
            </InputGroup>
            <Button
                padding="1rem"
                borderRadius="30px"
                backgroundColor="#5D5D5D"
                color="white"
                onClick={() => Router.push('/newAdvertisement')}
                _hover={{ opacity: 0.6 }}
            >
                <Text>Criar anúncio</Text>
            </Button>
        </Flex>
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
                                        <Text fontSize="10px">{`Anunciado por ${capitalizeWords(ad.userFullName)}`}</Text>
                                    </BookInfoBox>
                                </CardBody>
                            </Card>
                        ))}
                        {
                            isModalOpen && (<AdModal isOpen={isModalOpen} onCloseFunction={() => setIsModalOpen(false)} ad={selectedAd}/>)
                        }
                    </>
                ) : (
                    <Text>Nenhum anúncio cadastrado</Text>
                )
            }
        </CardsWrapper>
      </>
    </Layout>
  );
};

export default Ads;
