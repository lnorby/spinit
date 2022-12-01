import TrackItem from '@modules/track/components/TrackItem';
import Track from '@modules/track/models/Track';
import usePlayer from '@modules/player/hooks/usePlayer';

type TrackListProps = {
   tracks: Track[];
   positionByTrackNumber?: boolean;
   showAlbumImage: boolean;
   showArtists: boolean;
   showAlbumName: boolean;
   limit?: number;
};

const TrackList = ({
   tracks,
   positionByTrackNumber = true,
   showAlbumImage,
   showArtists,
   showAlbumName,
   limit,
}: TrackListProps) => {
   const { currentTrack, playTracks } = usePlayer();

   const handlePlay = (position: number) => {
      const tracksFromPosition = tracks.filter((track) => track.trackNumber >= position);
      playTracks(tracksFromPosition.map((track) => track.id));
   };

   let visibleTracks = tracks;

   if (limit && limit > 0) {
      visibleTracks = tracks.slice(0, limit);
   }

   return (
      <>
         {visibleTracks.map((track, index) => (
            <TrackItem
               position={positionByTrackNumber ? track.trackNumber : index + 1}
               track={track}
               showAlbumImage={showAlbumImage}
               showArtists={showArtists}
               showAlbumName={showAlbumName}
               active={track.id === currentTrack?.id}
               onPlay={(position) => handlePlay(position)}
               key={track.id}
            />
         ))}
      </>
   );
};

export default TrackList;
