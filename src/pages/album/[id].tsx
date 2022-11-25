import { GetServerSideProps } from 'next';
import ArtistLinks from '@components/ArtistLinks/ArtistLinks';
import styled from 'styled-components';
import Heading from '@components/Heading/Heading';
import Container from '@components/Container/Container';
import PlayButton from '@components/PlayButton/PlayButton';
import Spacer from '@components/Spacer/Spacer';
import { Album } from '@modules/album/types';
import { getAlbumTypeName } from '@modules/album/utils';
import EquilateralImage from '@components/EquilateralImage/EquilateralImage';
import ImagePlaceholder from '@components/ImagePlaceholder/ImagePlaceholder';
import AlbumTracks from '@modules/album/components/AlbumTracks';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import getAlbum from '@modules/album/api/getAlbum';

type AlbumPageProps = {
   album: Album;
};

const AlbumPage: NextPageWithLayout = ({ album }: AlbumPageProps) => {
   // const dispatch = useDispatch();

   const handlePlay = () => {
      // dispatch(addTracks(album.tracks.map((track) => track.id)));
   };

   return (
      <>
         <AlbumPageHeader>
            <AlbumImageContainer>
               {album.image !== '' ? (
                  <EquilateralImage src={album.image} width={230} height={230} priority alt="" />
               ) : (
                  <ImagePlaceholder />
               )}
            </AlbumImageContainer>
            <div>
               <AlbumLabel>{getAlbumTypeName(album.type)}</AlbumLabel>
               <Heading as="h1" level={1}>
                  {album.name}
               </Heading>
               <AlbumData>
                  <AlbumArtists>
                     <ArtistLinks artists={album.artists} />
                  </AlbumArtists>
                  <AlbumReleaseYear>{new Date(album.releaseDate).getFullYear()}</AlbumReleaseYear>
                  <div>{album.totalTracks} dal</div>
               </AlbumData>
            </div>
         </AlbumPageHeader>
         <AlbumPageBody>
            <Container>
               <PlayButton size="big" onClick={handlePlay} />
               <Spacer y={30} />
               <AlbumTracks albumId={album.id} />
            </Container>
         </AlbumPageBody>
      </>
   );
};

AlbumPage.getLayout = (page: ReactElement) => (
   <DefaultLayout title={page.props.album.name}>{page}</DefaultLayout>
);

const AlbumPageHeader = styled.header`
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

const AlbumLabel = styled.div`
   margin-bottom: 2px;
   font-size: 12px;
   font-weight: 700;
   text-transform: uppercase;
`;

const AlbumImageContainer = styled.div`
   flex-shrink: 0;
   width: 230px;
   margin: 0 28px -5px 0;
   box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
`;

const AlbumData = styled.div`
   display: flex;
   margin-top: 20px;
   font-size: 14px;
`;

const AlbumArtists = styled.div`
   font-weight: 600;

   &::after {
      content: '·';
      margin: 0 6px;
      font-weight: 700;
   }
`;

const AlbumReleaseYear = styled.div`
   &::after {
      content: '·';
      margin: 0 6px;
      font-weight: 700;
   }
`;

const AlbumPageBody = styled.main`
   padding: 25px 0 40px;
   background: rgba(0, 0, 0, 0.15);
`;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   try {
      return {
         props: {
            album: getAlbum(String(params?.id)),
         },
      };
   } catch (error) {
      return {
         notFound: true,
      };
   }
};

export default AlbumPage;
