import { Flex, Image, Text } from "@chakra-ui/react";

type LogoProps = {
  directionColumn?: boolean;
  showName?: boolean;
  flex?: string;
};

const Logo = ({
  directionColumn = false,
  flex = "none",
  showName = true,
}: LogoProps) => {
  return (
    <Flex
      flex={flex}
      justifyContent="center"
      gap="0.5rem"
      alignItems="center"
      direction={directionColumn ? "column" : "row"}
    >
      <Image src="booker-logo.png" boxSize="2rem" />
      {showName && <Text>BOOKER</Text>}
    </Flex>
  );
};

export default Logo;
