import { AlbumType } from '@modules/album/models/Album';
import useArtistAlbums from '@modules/album/hooks/useArtistAlbums';
import AlbumList from '@modules/album/components/AlbumList';

type ArtistAlbumsProps = {
   artistId: string;
   albumType: AlbumType;
};

const ArtistAlbums = ({ artistId, albumType }: ArtistAlbumsProps) => {
   const query = useArtistAlbums(artistId, albumType, 20);

   if (query.isLoading) {
      return;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   return (
      <>
         {query.data?.length ? (
            <AlbumList albums={query.data} showArtists={false} />
         ) : (
            <p>Nincs ilyen album.</p>
         )}
      </>
   );
};

export default ArtistAlbums;
