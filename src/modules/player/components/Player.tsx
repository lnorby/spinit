import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { RootState } from '@store/store';
import styled from 'styled-components';
import PlayerTrack from '@modules/player/components/PlayerTrack';
import getTrack from '@modules/track/api/getTrack';

// TODO: custom hook
const Player = () => {
   const currentTrackIdInPlaylist: string | null = useSelector(
      (state: RootState) => state.playlist.tracks?.[state.playlist.currentIndex] ?? null
   );

   const firstTrackQuery = useQuery({
      queryKey: ['track', currentTrackIdInPlaylist],
      queryFn: () => getTrack(currentTrackIdInPlaylist),
      keepPreviousData: true,
      enabled: currentTrackIdInPlaylist !== null,
   });

   if (!firstTrackQuery.data) {
      return null;
   }

   return (
      <StyledPlayer>
         <PlayerBar>
            <PlayerTrack track={firstTrackQuery.data} />
         </PlayerBar>
      </StyledPlayer>
   );
};

const StyledPlayer = styled.div`
   height: 90px;
`;

const PlayerBar = styled.div`
   position: fixed;
   bottom: 0;
   left: 0;
   display: flex;
   align-items: center;
   width: 100%;
   height: 90px;
   padding: 0 16px;
   border-top: 1px solid #282828;
   background: #181818;
   z-index: 999;
`;

export default Player;
