import useAlbums from '@modules/album/hooks/useAlbums';
import AlbumList from '@modules/album/components/AlbumList';

type AlbumSearchProps = {
   searchQuery: string;
   limit: number;
};

// TODO: pagination
const AlbumSearch = ({ searchQuery, limit }: AlbumSearchProps) => {
   const query = useAlbums(searchQuery, limit);

   if (query.isLoading) {
      return;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   return (
      <>
         {query.data?.length ? (
            <AlbumList albums={query.data} showArtists={true} />
         ) : (
            <p>Nincs találat.</p>
         )}
      </>
   );
};

export default AlbumSearch;
