import { defaultTheme } from "@/components/themes/dafaultTheme";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { useLocalStorage } from "usehooks-ts";

export default function App({ Component, pageProps }: AppProps) {
  const [theme] = useLocalStorage("theme", defaultTheme);

  const styles = {
    global: {
      body: {
        background: `${theme.bodyColor}`,
        color: `${theme.textColor}`
      }
    }
  };

  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={extendTheme({ styles })}>
          <ThemeProvider theme={theme}>
              <Component {...pageProps} />
          </ThemeProvider>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}
