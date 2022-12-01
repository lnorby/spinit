import {useQuery} from 'react-query';
import getTrack from '@modules/track/api/getTrack';
import usePlaylistStore from '@store/usePlaylistStore';
import shallow from 'zustand/shallow';

const usePlayer = () => {
   const playlist = usePlaylistStore((state) => state, shallow);

   const currentTrackQuery = useQuery({
      queryKey: ['track', playlist.currentTrackId()],
      queryFn: () => getTrack(playlist.currentTrackId()),
      keepPreviousData: true,
      enabled: playlist.currentTrackId() !== undefined,
   });

   const playTracks = (trackIds: string[]) => {
      playlist.addTracks(trackIds);
   };

   const playNextTrack = () => {
      playlist.nextTrack();
   };

   const playPreviousTrack = () => {
      playlist.previousTrack();
   };

   return {
      playTracks,
      currentTrack: currentTrackQuery.data,
      playNextTrack,
      playPreviousTrack,
   };
};

export default usePlayer;
