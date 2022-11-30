import useTracks from '@modules/track/hooks/useTracks';
import TrackList from '@modules/track/components/TrackList';
import ScrollObserver from '@components/ScrollObserver/ScrollObserver';

type TrackSearchProps = {
   searchQuery: string;
   limit: number;
   loadMore: boolean;
};

const TrackSearch = ({ searchQuery, limit, loadMore }: TrackSearchProps) => {
   const query = useTracks(searchQuery, limit);

   if (query.isLoading) {
      return null;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   const tracks = query.data?.pages.map((page) => page.tracks).flat() ?? [];

   if (!tracks[0]) {
      return <p>Nincs találat.</p>;
   }

   return (
      <>
         <TrackList
            tracks={tracks}
            positionByTrackNumber={false}
            showAlbumImage={true}
            showArtists={true}
            showAlbumName={true}
         />
         {loadMore && query.hasNextPage ? (
            <ScrollObserver onTrigger={() => query.fetchNextPage()} />
         ) : null}
      </>
   );
};

export default TrackSearch;
