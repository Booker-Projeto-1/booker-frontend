import { GlobalStyle } from "@/components/themes/GlobalStyle";
import { defaultTheme } from "@/components/themes/dafaultTheme";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { useLocalStorage } from "usehooks-ts";

export default function App({ Component, pageProps }: AppProps) {
  const [theme] = useLocalStorage("theme", defaultTheme);

  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}
