import useAlbumTracks from '@modules/track/hooks/useAlbumTracks';
import TrackList from '@modules/track/components/TrackList';

type AlbumTracksProps = {
   albumId: string;
};

// TODO: pagination
const AlbumTracks = ({ albumId }: AlbumTracksProps) => {
   const query = useAlbumTracks(albumId, 25);

   return (
      <>
         {query.isError ? <p>Nem sikerült betölteni a tartalmat.</p> : null}
         {query.data ? (
            <TrackList
               tracks={query.data}
               showAlbumImage={false}
               showArtists={true}
               showAlbumName={false}
            />
         ) : null}
      </>
   );
};

export default AlbumTracks;
