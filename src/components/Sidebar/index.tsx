import { AuthContext } from "@/context/AuthContext";
import { Icon } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { BsBook, BsBoxArrowRight, BsHouse, BsPerson } from "react-icons/bs";
import Logo from "../Logo";
import { SidebarButton, SidebarButtonGroup, Wrapper } from "./style";

const Sidebar = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <Wrapper>
      <Logo directionColumn showName={false} />
      <SidebarButtonGroup>
        <SidebarButton
          className="sidebarbutton"
          leftIcon={<Icon as={BsHouse} />}
        >
          <Link href={"/ads"}>Anúncios</Link>
        </SidebarButton>
        <SidebarButton
          className="sidebarbutton"
          leftIcon={<Icon as={BsBook} />}
        >
          <Link href={"/myads"}>Meus Anúncios</Link>
        </SidebarButton>
        <SidebarButton
          className="sidebarbutton"
          leftIcon={<Icon as={BsPerson} />}
        >
          <Link href={"/me"}>Meu Perfil</Link>
        </SidebarButton>
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
