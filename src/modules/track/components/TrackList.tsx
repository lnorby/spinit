import TrackItem from '@modules/track/components/TrackItem';
import { useDispatch } from 'react-redux';
import { addTracks } from '@store/playlistSlice';
import Track from '@modules/track/models/Track';

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
   const dispatch = useDispatch();

   const handlePlay = (position: number) => {
      const tracksFromPosition = tracks.filter((track) => track.trackNumber >= position);
      dispatch(addTracks(tracksFromPosition.map((track) => track.id)));
   };

   let visibleTracks = tracks;

   if (limit && limit > 0) {
      visibleTracks = tracks.slice(0, limit);
   }

   return (
      <>
         {visibleTracks.map((track, index) => (
            <TrackItem
               key={track.id}
               position={positionByTrackNumber ? track.trackNumber : index + 1}
               track={track}
               showAlbumImage={showAlbumImage}
               showArtists={showArtists}
               showAlbumName={showAlbumName}
               onPlay={(position) => handlePlay(position)}
            />
         ))}
      </>
   );
};

export default TrackList;
