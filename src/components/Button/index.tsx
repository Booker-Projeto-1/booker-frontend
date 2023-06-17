import { Button } from "@chakra-ui/react";
import { NextPage } from "next";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  secondary?: boolean;
}

const PButton: NextPage<Props> = ({ onClick, children, secondary }) => {
  return (
    <Button
      borderRadius="30px"
      backgroundColor={secondary ? "#FFF" : "#5E5E5E"}
      color={secondary ? "#5E5E5E" : "#FFF"}
      border={secondary ? "1px solid #5E5E5E" : "none"}
      as="a"
      onClick={onClick}
      cursor="pointer"
    >
      {children}
    </Button>
  );
};

export default PButton;
