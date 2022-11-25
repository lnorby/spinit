import useArtists from '@modules/artist/hooks/useArtists';
import ArtistList from '@modules/artist/components/ArtistList';

type ArtistSearchProps = {
   searchQuery: string;
   limit: number;
};

// TODO: pagination
const ArtistSearch = ({ searchQuery, limit }: ArtistSearchProps) => {
   const query = useArtists(searchQuery, limit);

   return (
      <>
         {query.isLoading ? <p>Betöltés...</p> : null}
         {query.isError ? <p>Nem sikerült betölteni a tartalmat.</p> : null}
         {query.data ? <ArtistList artists={query.data} /> : null}
      </>
   );
};

export default ArtistSearch;
