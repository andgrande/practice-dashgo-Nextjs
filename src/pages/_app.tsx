import { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react"
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';

import { theme } from '../styles/theme';
import { makeServer } from '../services/mirage';
import { QueryClient, QueryClientProvider } from 'react-query';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient} >
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
