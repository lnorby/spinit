import useAlbums from '@modules/album/hooks/useAlbums';
import AlbumList from '@modules/album/components/AlbumList';

type AlbumSearchProps = {
   searchQuery: string;
   limit: number;
};

// TODO: pagination
const AlbumSearch = ({ searchQuery, limit }: AlbumSearchProps) => {
   const query = useAlbums(searchQuery, limit);

   return (
      <>
         {query.isLoading ? <p>Betöltés...</p> : null}
         {query.isError ? <p>Nem sikerült betölteni a tartalmat.</p> : null}
         {query.data ? <AlbumList albums={query.data} showArtists={true} /> : null}
      </>
   );
};

export default AlbumSearch;
