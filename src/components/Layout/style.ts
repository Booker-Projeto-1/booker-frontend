import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #B2B1B1;
    min-height: 100vh;
    align-items: center;
`;

export const SidebarContainer = styled.div`
    width: 30%;
    max-width: 16rem;
    background-color: white;
    @media (max-width: 800px) {
        display: none;
    }
`;