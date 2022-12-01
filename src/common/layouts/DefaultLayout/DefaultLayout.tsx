import Header from '@components/Header/Header';
import Player from '@modules/player/components/Player';
import {ReactNode} from 'react';
import Head from 'next/head';
import usePageLoadingStatus from '@hooks/usePageLoadingStatus';

type DefaultLayoutProps = {
   children: ReactNode;
   title?: string;
};

const DefaultLayout = ({ children, title }: DefaultLayoutProps) => {
   const isPageLoading = usePageLoadingStatus();

   return (
      <>
         <Head>
            <title>{title ? `${title} | ` : ''}SpinIt</title>
         </Head>
         <Header />
         <main>{!isPageLoading ? children : null}</main>
         <Player />
      </>
   );
};

export default DefaultLayout;
