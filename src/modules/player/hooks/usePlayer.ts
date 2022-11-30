import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useQuery } from 'react-query';
import getTrack from '@modules/track/api/getTrack';
import { addTracks } from '@store/playlistSlice';

const usePlayer = () => {
   const dispatch = useDispatch();

   const currentTrackId = useSelector(
      (state: RootState) => state.playlist.trackIds?.[state.playlist.currentIndex]
   );

   const currentTrackQuery = useQuery({
      queryKey: ['track', currentTrackId],
      queryFn: () => getTrack(currentTrackId),
      keepPreviousData: true,
      enabled: currentTrackId !== undefined,
   });

   const playTracks = (trackIds: string[]) => {
      dispatch(addTracks(trackIds));
   };

   return {
      playTracks,
      currentTrack: currentTrackQuery.data,
   };
};

export default usePlayer;
