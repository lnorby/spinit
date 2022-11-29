import useArtists from '@modules/artist/hooks/useArtists';
import ArtistList from '@modules/artist/components/ArtistList';

type ArtistSearchProps = {
   searchQuery: string;
   limit: number;
};

// TODO: pagination
const ArtistSearch = ({ searchQuery, limit }: ArtistSearchProps) => {
   const query = useArtists(searchQuery, limit);

   if (query.isLoading) {
      return null;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   return <>{query.data?.length ? <ArtistList artists={query.data} /> : <p>Nincs találat.</p>}</>;
};

export default ArtistSearch;
