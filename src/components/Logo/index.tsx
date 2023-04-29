import { Flex, Image, Img, Text } from "@chakra-ui/react";

type LogoProps = {
    directionColumn?: boolean,
    flex?: string
}

const Logo = ({ directionColumn = false, flex = "none" }: LogoProps) => {
    return (
        <Flex flex={flex} justifyContent="center" gap="0.5rem" alignItems="center" direction={directionColumn ? 'column' : 'row'}>
            <Image src="booker-logo.png" boxSize="2rem"/>
            <Text>BOOKER</Text>
        </Flex>
    );
}

export default Logo;