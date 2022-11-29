import useTracks from '@modules/track/hooks/useTracks';
import TrackList from '@modules/track/components/TrackList';

type TrackSearchProps = {
   searchQuery: string;
   limit: number;
};

// TODO: pagination
const TrackSearch = ({ searchQuery, limit }: TrackSearchProps) => {
   const query = useTracks(searchQuery, limit);

   if (query.isLoading) {
      return null;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   return (
      <>
         {query.data?.length ? (
            <TrackList
               tracks={query.data}
               positionByTrackNumber={false}
               showAlbumImage={true}
               showArtists={true}
               showAlbumName={true}
            />
         ) : (
            <p>Nincs találat.</p>
         )}
      </>
   );
};

export default TrackSearch;
