import AdModal from "@/components/AdModal";
import Layout from "@/components/Layout";
import { getUserAds } from "@/services/advertisement";
import googleBooksService from "@/services/googleBooksService";
import { Ad } from "@/types/types";
import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Ads from "../ads";
import { BookInfoBox, CardsWrapper, Image } from "./styles";

interface Props {}

const defaultBook = {
  id: "",
  title: "",
  authors: [],
  publisher: "",
  description: "",
  imageLink: "",
};

const MyAds: NextPage<Props> = ({}) => {
  const [data, setData] = useState<Ads>([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad>({
    id: 1,
    userEmail: "",
    active: false,
    bookId: "",
    borrowed: false,
    description: "",
    phoneNumber: "",
    book: defaultBook,
  });

  const toast = useToast();

  const handleClickCard = (ad: Ad) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    getUserAds()
      .then((res) => {
        Promise.all(
          res.map(async (ad: any) => {
            const response = await googleBooksService.getBookById(ad.bookId);
            const book = {
              id: response.id,
              title: response.volumeInfo.title,
              authors: response.volumeInfo.authors,
              description: response.volumeInfo.description,
              publisher: response.volumeInfo.publisher,
              imageLink: response.volumeInfo.imageLinks?.thumbnail,
            };
            return { ...ad, book };
          })
        ).then((res) => {
          setData(res);
          setLoading(false);
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao carregar anúncios",
          description: err.message,
          status: "error",
          isClosable: true,
        });
      });
  }, [isModalOpen]);

  return (
    <Layout title="Meus Anúncios">
      <CardsWrapper>
        {isLoading ? (
          <Spinner />
        ) : data.length ? (
          data.map((ad) => (
            <Card
              key={ad.id}
              cursor="pointer"
              w="11rem"
              h="15rem"
              onClick={() => handleClickCard(ad)}
            >
              <CardHeader h="3rem" padding={2}>
                <Text fontSize="12" fontWeight="bold" isTruncated>
                  {ad.book.title}
                </Text>
              </CardHeader>
              <CardBody padding={0}>
                <Image src={ad.book.imageLink} alt={ad.book.title} h={40} />
                <BookInfoBox>
                  <Text fontSize="12" fontWeight="bold">
                    {ad.active ? "Anunciado para Empréstimo" : "Não Anunciado"}
                  </Text>
                </BookInfoBox>
              </CardBody>
            </Card>
          ))
        ) : (
          <Text>Nenhum anúncio encontrado</Text>
        )}
      </CardsWrapper>
      <AdModal
        isOpen={isModalOpen}
        onCloseFunction={() => setIsModalOpen(false)}
        ad={selectedAd}
        selfAd={true}
      />
    </Layout>
  );
};

export default MyAds;
