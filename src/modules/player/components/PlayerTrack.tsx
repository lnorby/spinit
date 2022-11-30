import styled from 'styled-components';
import ArtistLinks from '@components/ArtistLinks/ArtistLinks';
import Track from '@modules/track/models/Track';
import ImagePlaceholder from '@components/ImagePlaceholder/ImagePlaceholder';
import EquilateralImage from '@components/EquilateralImage/EquilateralImage';

type PlayerTrackProps = {
   track: Track;
};

const PlayerTrack = ({ track }: PlayerTrackProps) => {
   return (
      <StyledTrack>
         <TrackImageContainer>
            {track.album?.primaryImage ? (
               <EquilateralImage src={track.album.primaryImage.url} width={56} height={56} alt="" />
            ) : (
               <ImagePlaceholder />
            )}
         </TrackImageContainer>
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

const TrackImageContainer = styled.div`
   flex-shrink: 0;
   width: 56px;
   margin-right: 14px;
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
