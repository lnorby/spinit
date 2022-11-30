import styled from 'styled-components';
import PlayerTrack from '@modules/player/components/PlayerTrack';
import usePlayer from '@modules/player/hooks/usePlayer';

const Player = () => {
   const { currentTrack } = usePlayer();

   if (!currentTrack) {
      return null;
   }

   return (
      <StyledPlayer>
         <PlayerBar>
            <PlayerTrack track={currentTrack} />
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
