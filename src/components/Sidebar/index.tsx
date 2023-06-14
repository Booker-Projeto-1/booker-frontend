import { AuthContext } from "@/context/AuthContext";
import { Icon } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { BsBook, BsBoxArrowRight, BsHouse, BsPerson } from "react-icons/bs";
import { FaRegHandshake } from 'react-icons/fa';
import Logo from "../Logo";
import { SidebarButton, SidebarButtonGroup, Wrapper } from "./style";

const Sidebar = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <Wrapper>
      <Logo directionColumn showName={false} />
      <SidebarButtonGroup>
        <Link href={"/ads"}>
          <SidebarButton
            className="sidebarbutton"
            leftIcon={<Icon as={BsHouse} />}
          >
            Anúncios
          </SidebarButton>
        </Link>
        <Link href={"/myads"}>
          <SidebarButton
            className="sidebarbutton"
            leftIcon={<Icon as={BsBook} />}
          >
            Meus Anúncios
          </SidebarButton>
        </Link>
        <Link href={"/myloans"}>
          <SidebarButton
            className="sidebarbutton"
            leftIcon={<Icon as={FaRegHandshake} />}
          >
             Meus Empréstimos
          </SidebarButton>
        </Link>
        <Link href={"/me"}>
          <SidebarButton
            className="sidebarbutton"
            leftIcon={<Icon as={BsPerson} />}
          >
            Meu Perfil
          </SidebarButton>
        </Link>
        <SidebarButton
          className="sidebarbutton"
          leftIcon={<Icon as={BsBoxArrowRight} />}
          onClick={() => signOut()}
        >
          Sair
        </SidebarButton>
      </SidebarButtonGroup>
    </Wrapper>
  );
};

export default Sidebar;
