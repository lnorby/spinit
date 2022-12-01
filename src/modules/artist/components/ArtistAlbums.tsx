import {AlbumType} from '@modules/album/models/Album';
import useArtistAlbums from '@modules/album/hooks/useArtistAlbums';
import AlbumList from '@modules/album/components/AlbumList';
import ScrollObserver from '@components/ScrollObserver/ScrollObserver';

type ArtistAlbumsProps = {
   artistId: string;
   albumType: AlbumType;
};

const ArtistAlbums = ({ artistId, albumType }: ArtistAlbumsProps) => {
   const query = useArtistAlbums(artistId, albumType, 30);

   if (query.isLoading) {
      return null;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   const albums = query.data?.pages.map((page) => page.albums).flat() ?? [];

   if (!albums[0]) {
      return <p>Nincs ilyen album.</p>;
   }

   return (
      <>
         <AlbumList albums={albums} showArtists={false} />
         {query.hasNextPage ? <ScrollObserver onTrigger={() => query.fetchNextPage()} /> : null}
      </>
   );
};

export default ArtistAlbums;
