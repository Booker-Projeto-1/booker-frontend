import Header from "@/components/Header";
import { SidebarContainer, Wrapper } from './style';
import { Flex } from '@chakra-ui/react';
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

type LayoutProps = {
    title?: string
    children: ReactNode
}

const Layout = ({title, children} : LayoutProps) => {
    return (
        <Flex w="100%">
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Wrapper>
                <Header />
                <h1>{title}</h1>
                {children}
            </Wrapper>
        </Flex>
    );
}

export default Layout;