import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import Heading from '@components/Heading/Heading';
import Container from '@components/Container/Container';
import Spacer from '@components/Spacer/Spacer';
import PlayButton from '@components/PlayButton/PlayButton';
import { Artist } from '@modules/artist/types';
import ArtistDiscography from '@modules/artist/components/ArtistDiscography';
import ArtistTopTracks from '@modules/artist/components/ArtistTopTracks';
import EquilateralImage from '@components/EquilateralImage/EquilateralImage';
import ImagePlaceholder from '@components/ImagePlaceholder/ImagePlaceholder';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import getArtist from '@modules/artist/api/getArtist';

type ArtistPageProps = {
   artist: Artist;
};

const ArtistPage: NextPageWithLayout = ({ artist }: ArtistPageProps) => {
   const handlePlay = () => {};

   return (
      <>
         <ArtistPageHeader>
            <ArtistImageContainer>
               {artist.image !== '' ? (
                  <EquilateralImage src={artist.image} width={230} height={230} priority alt="" />
               ) : (
                  <ImagePlaceholder />
               )}
            </ArtistImageContainer>
            <div>
               <Heading as="h1" level={1}>
                  {artist.name}
               </Heading>
               {/*<ArtistPopularity>{artist.popularity} hallgató havonta</ArtistPopularity>*/}
            </div>
         </ArtistPageHeader>
         <ArtistPageBody>
            <Container>
               <PlayButton size="big" onClick={handlePlay} />
               <Spacer y={30} />
               <ArtistPageHeading as="h2" level={2}>
                  Népszerű
               </ArtistPageHeading>
               <ArtistTopTracks artistId={artist.id} />
               <Spacer y={40} />
               <ArtistPageHeading as="h2" level={2}>
                  Diszkográfia
               </ArtistPageHeading>
               <ArtistDiscography artistId={artist.id} />
            </Container>
         </ArtistPageBody>
      </>
   );
};

ArtistPage.getLayout = (page: ReactElement) => (
   <DefaultLayout title={page.props.artist.name}>{page}</DefaultLayout>
);

const ArtistPageHeader = styled.header`
   position: relative;
   display: flex;
   align-items: flex-end;
   padding: 120px 30px 30px;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 165%;
      background: linear-gradient(to bottom, #3cabd9, #121212);
   }
`;

const ArtistImageContainer = styled.div`
   flex-shrink: 0;
   width: 230px;
   margin: 0 28px -5px 0;
   border-radius: 50%;
   box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
   overflow: hidden;
`;

// const ArtistPopularity = styled.div`
//     display: flex;
//     margin-top: 20px;
// `;

const ArtistPageBody = styled.main`
   padding: 25px 0 40px;
   background: rgba(0, 0, 0, 0.15);
`;

const ArtistPageHeading = styled(Heading)`
   margin-bottom: 25px;
`;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   try {
      return {
         props: {
            artist: await getArtist(String(params?.id)),
         },
      };
   } catch (error) {
      return {
         notFound: true,
      };
   }
};

export default ArtistPage;
