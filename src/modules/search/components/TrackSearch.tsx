import useTracks from '@modules/track/hooks/useTracks';
import TrackList from '@modules/track/components/TrackList';

type TrackSearchProps = {
   searchQuery: string;
   limit: number;
};

// TODO: pagination
const TrackSearch = ({ searchQuery, limit }: TrackSearchProps) => {
   const query = useTracks(searchQuery, limit);

   return (
      <>
         {query.isLoading ? <p>Betöltés...</p> : null}
         {query.isError ? <p>Nem sikerült betölteni a tartalmat.</p> : null}
         {query.data ? (
            <TrackList
               tracks={query.data}
               positionByTrackNumber={false}
               showAlbumImage={true}
               showArtists={true}
               showAlbumName={true}
            />
         ) : null}
      </>
   );
};

export default TrackSearch;
