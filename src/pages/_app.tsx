import { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react"
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';

import { theme } from '../styles/theme';
import { makeServer } from '../services/mirage';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../services/queryClient';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient} >
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
