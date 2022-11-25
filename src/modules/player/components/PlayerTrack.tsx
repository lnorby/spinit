import styled from 'styled-components';
import ArtistLinks from '@components/ArtistLinks/ArtistLinks';
import Image from 'next/image';
import { Track } from '@modules/track/types';

type PlayerTrackProps = {
   track: Track;
};

const PlayerTrack = ({ track }: PlayerTrackProps) => {
   return (
      <StyledTrack>
         <TrackImage src={track.album?.image ?? ''} width={56} height={56} alt="" />
         <div>
            <TrackName>{track.name}</TrackName>
            <TrackArtists>
               <ArtistLinks artists={track.artists} />
            </TrackArtists>
         </div>
      </StyledTrack>
   );
};

const StyledTrack = styled.div`
   display: flex;
   align-items: center;
`;

const TrackImage = styled(Image)`
   flex-shrink: 0;
   margin-right: 14px;
   object-fit: cover;
`;

const TrackName = styled.div`
   font-size: 14px;
`;

const TrackArtists = styled.div`
   margin-top: 5px;
   font-size: 11px;
   color: ${(p) => p.theme.colors.text.soft};
`;

export default PlayerTrack;
