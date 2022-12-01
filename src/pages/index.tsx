import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';

const HomePage: NextPageWithLayout = () => {
   return <></>;
};

HomePage.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
