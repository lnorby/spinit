import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@styles/globals';
import Reset from '@styles/reset';
import theme from '@styles/theme';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 0,
      },
   },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
   getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
   const getLayout = Component.getLayout ?? ((page) => page);

   return (
      <ThemeProvider theme={theme}>
         <QueryClientProvider client={queryClient}>
            <Reset />
            <GlobalStyles />
            {getLayout(<Component {...pageProps} />)}
         </QueryClientProvider>
      </ThemeProvider>
   );
};

export default App;
