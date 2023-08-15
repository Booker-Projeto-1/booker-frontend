import Logo from "@/components/Logo";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";

const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLinks = () => (
    <>
      <Link href={"/signup"}>
        <Button
          borderColor="#5E5E5E"
          color="#5E5E5E"
          variant="outline"
          w={["100%", "12rem"]}
        >
          Sign Up
        </Button>
      </Link>
      <Link href={"/login"}>
        <Button bg="#5E5E5E" color="#FFF" variant="solid" w={["100%", "12rem"]}>
          Login
        </Button>
      </Link>
    </>
  );

  return (
    <Flex direction={"column"} w={"100%"} h={"100vh"}>
      <nav>
        <>
          <Box bg={"white.500"} px={4} color={"black"} w="100%" padding={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
              <HStack
                spacing={8}
                alignItems={"center"}
                justifyContent={"space-between"}
                width="100%"
                paddingX={4}
              >
                <Link href={"/"}>
                  <Logo />
                </Link>

                <IconButton
                  size={"md"}
                  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  aria-label={"Open Menu"}
                  display={{ md: "none" }}
                  onClick={isOpen ? onClose : onOpen}
                  bg="#5E5E5E"
                  color="white"
                />
              </HStack>

              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <NavLinks />
              </HStack>
            </Flex>
          </Box>

          {isOpen ? (
            <Box display={{ md: "none" }} w="100%">
              <HStack as={"nav"} spacing={4}>
                <NavLinks />
              </HStack>
            </Box>
          ) : null}
        </>
      </nav>
      <Flex
        direction={["column", "column", "row"]}
        paddingX={["0rem", "6rem", "12rem"]}
        align="center"
        justify={["space-around", "space-between"]}
        h="80%"
      >
        <Flex
          direction="column"
          justify={"center"}
          align={"center"}
          gap={4}
          w={["100%", "20rem", "25rem"]}
        >
          <Heading
            fontFamily={`'Poppins', sans-serif`}
            fontWeight={"900"}
            color={"#5E5E5E"}
            size={"2xl"}
          >
            Booker
          </Heading>
          <Text
            fontFamily={`'Roboto', sans-serif`}
            color={"#5E5E5E"}
            textAlign={"center"}
            fontSize="xl"
          >
            Descubra um mundo de livros e conecte-se com outros entusiastas da
            leitura.
          </Text>
        </Flex>
        <Image
          src="./undraw_bookshelves_re_lxoy.svg"
          alt="Bookshelf Image"
          w={["46rem"]}
        />
      </Flex>
      <Box position="relative" zIndex="docked" w="100%" h="100%">
        <Image
          src="/wave.svg"
          alt="wave"
          position="absolute"
          bottom="0"
          left="0"
          w="100vw"
        />
      </Box>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Landing;
