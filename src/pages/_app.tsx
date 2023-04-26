import { GlobalStyle } from "@/components/themes/GlobalStyle";
import { defaultTheme } from "@/components/themes/dafaultTheme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ChakraProvider>
    </>
  );
}
