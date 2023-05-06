import { useEffect, useState } from 'react';
import { InputLeftElement, Text, Card, Spinner } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import { Book, Books } from '@/types/types';
import Layout from "@/components/Layout";
import googleBooksService from '@/services/googleBooksService';

import { InputGroup, Input, BookInfoBox, CardBody, Image, CardsWrapper } from './style';
import BookModal from '@/components/NewAdvertisementModal';

const NewAdvertisement = () => {
    const [data, setData] = useState<Books>([]);
    const [isLoading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book>({ id: "", title: "", authors: [], publisher: "", description: "", imageLink: ""});

    useEffect(() => {
        if (query) {
            const timeout = setTimeout(() => {
                setLoading(true);
                googleBooksService.searchBooks(query).then((res) => {
                    if (res.items) {
                        const responseData = res.items.map(({ id, volumeInfo }: any) => ({
                            id,
                            title: volumeInfo.title,
                            authors: volumeInfo.authors,
                            description: volumeInfo.description,
                            publisher: volumeInfo.publisher,
                            imageLink: volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail
                        }));
                        setData(responseData);
                    } else {
                        setData([]);
                    }
    
                    setLoading(false);
                }).catch((err: any) => console.log(err));
            }, 500)

            return () => clearTimeout(timeout)    
        }
     
        return () => {}
    }, [query]);
 
    const handleSearchInputChange = (value: string) => {
        setQuery(value);
    }

    const handleClickCard = (book: Book) => {
        setIsModalOpen(true);
        setSelectedBook(book);
    }

    return (
        <Layout>
            <>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Search2Icon color='gray.300' />}
                    />
                    <Input type='search' placeholder='Buscar livro' value={query} onChange={({ target }) => handleSearchInputChange(target.value)}/>
                </InputGroup>
                <CardsWrapper>
                    {
                        isLoading ? 
                            <Spinner />
                        :
                        data.length ? (
                            <>
                                {data.map((book) => (
                                    <Card key={book.id} cursor="pointer" w="10rem" h="12rem" onClick={() => handleClickCard(book)}>
                                        <CardBody>
                                            <Image
                                                src={book.imageLink || "book-default.png"}
                                                alt={book.title}
                                            />
                                            <BookInfoBox>
                                                <Text fontSize="12px" fontWeight="bold">{book.title.substring(0, 50)}</Text>
                                                <Text fontSize="12px">{book.authors && book.authors.join(", ").substring(0, 50)}</Text>
                                            </BookInfoBox>
                                        </CardBody>
                                    </Card>
                                ))}
                                <BookModal isOpen={isModalOpen} onCloseFunction={() => setIsModalOpen(false)} book={selectedBook}/>
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

export default NewAdvertisement