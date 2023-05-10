import { Icon } from "@chakra-ui/react";
import { SidebarButton, SidebarButtonGroup, Wrapper } from "./style";
import { BsHouse, BsBook, BsPerson, BsBoxArrowRight } from 'react-icons/bs';
import Logo from "../Logo";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Sidebar = () => {
    const { signOut } = useContext(AuthContext);

    return (
        <Wrapper>
            <Logo directionColumn showName={false} />
            <SidebarButtonGroup>
                <SidebarButton className="sidebarbutton" leftIcon={<Icon as={BsHouse}/>}>Anúncios</SidebarButton>
                <SidebarButton className="sidebarbutton" leftIcon={<Icon as={BsBook}/>}>Meus Livros</SidebarButton>
                <SidebarButton className="sidebarbutton" leftIcon={<Icon as={BsPerson}/>}>Meu Perfil</SidebarButton>
                <SidebarButton className="sidebarbutton" leftIcon={<Icon as={BsBoxArrowRight}/>} onClick={() => signOut()}>Sair</SidebarButton>
            </SidebarButtonGroup>
        </Wrapper>
    );
}

export default Sidebar;