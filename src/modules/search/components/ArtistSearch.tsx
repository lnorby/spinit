import useArtists from '@modules/artist/hooks/useArtists';
import ArtistList from '@modules/artist/components/ArtistList';
import ScrollObserver from '@components/ScrollObserver/ScrollObserver';

type ArtistSearchProps = {
   searchQuery: string;
   limit: number;
   loadMore: boolean;
};

const ArtistSearch = ({ searchQuery, limit, loadMore }: ArtistSearchProps) => {
   const query = useArtists(searchQuery, limit);

   if (query.isLoading) {
      return null;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   const artists = query.data?.pages.map((page) => page.artists).flat() ?? [];

   if (!artists[0]) {
      return <p>Nincs találat.</p>;
   }

   return (
      <>
         <ArtistList artists={artists} />
         {loadMore && query.hasNextPage ? (
            <ScrollObserver onTrigger={() => query.fetchNextPage()} />
         ) : null}
      </>
   );
};

export default ArtistSearch;
