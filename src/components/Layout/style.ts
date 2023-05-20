import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 100vh;
    align-items: center;

    h1 {
        color: ${(props) => props.theme.palette.darker.main};
        font-weight: bold;
        font-size: 1.5rem;
    }
`;

export const SidebarContainer = styled.div`
    width: 30%;
    max-width: 16rem;
    background-color: white;
    @media (max-width: 800px) {
        display: none;
    }
`;