import Header from "@/components/Header";
import { SidebarContainer, Wrapper } from './style';
import { Flex } from '@chakra-ui/react';
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode
}

const Layout = ({children} : LayoutProps) => {
    return (
        <Flex w="100%">
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Wrapper>
                <Header />
                {children}
            </Wrapper>
        </Flex>
    );
}

export default Layout;