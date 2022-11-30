import Link from 'next/link';
import ArtistLinks from '@components/ArtistLinks/ArtistLinks';
import styled from 'styled-components';
import { truncateText } from '@styles/utils';
import ImagePlaceholder from '@components/ImagePlaceholder/ImagePlaceholder';
import EquilateralImage from '@components/EquilateralImage/EquilateralImage';
import Track from '@modules/track/models/Track';

type TrackItemProps = {
   position: number;
   track: Track;
   showAlbumImage: boolean;
   showArtists: boolean;
   showAlbumName: boolean;
   isActive: boolean;
   onPlay: (position: number) => void;
};

// TODO: play button on hover
const TrackItem = ({
   position,
   track,
   showAlbumImage,
   showArtists,
   showAlbumName,
   isActive,
   onPlay,
}: TrackItemProps) => {
   return (
      <StyledTrackItem onDoubleClick={() => onPlay(position)}>
         <TrackPosition highlighted={isActive}>{position}</TrackPosition>
         {showAlbumImage ? (
            <TrackImageContainer>
               {track.album?.primaryImage ? (
                  <EquilateralImage
                     src={track.album.primaryImage.url}
                     width={40}
                     height={40}
                     alt=""
                  />
               ) : (
                  <ImagePlaceholder />
               )}
            </TrackImageContainer>
         ) : null}
         <TrackMain>
            <TrackName highlighted={isActive}>{track.name}</TrackName>
            {showArtists ? (
               <TrackArtists>
                  <ArtistLinks artists={track.artists} />
               </TrackArtists>
            ) : null}
         </TrackMain>
         {showAlbumName && track.album ? (
            <TrackAlbum>
               <TrackAlbumLink href={track.album.url}>{track.album.name}</TrackAlbumLink>
            </TrackAlbum>
         ) : null}
         <TrackDuration>{track.duration}</TrackDuration>
      </StyledTrackItem>
   );
};

const StyledTrackItem = styled.div`
   display: flex;
   align-items: center;
   padding: 8px;
   border-radius: 4px;
   color: ${(p) => p.theme.colors.text.soft};
   cursor: default;
   user-select: none;

   &:hover {
      background: rgba(255, 255, 255, 0.1);
   }
`;

const TrackPosition = styled.div<{ highlighted: boolean }>`
   width: 30px;
   margin: 0 20px 0 -8px;
   text-align: right;
   color: ${(p) => (p.highlighted ? p.theme.colors.accent.primary : p.theme.colors.text.soft)};
`;

const TrackImageContainer = styled.div`
   flex-shrink: 0;
   width: 40px;
   margin-right: 18px;
`;

const TrackMain = styled.div`
   flex: 1;
`;

const TrackName = styled.h3<{ highlighted: boolean }>`
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   color: ${(p) => (p.highlighted ? p.theme.colors.accent.primary : p.theme.colors.text.normal)};
`;

const TrackArtists = styled.div`
   margin-top: 4px;
   font-size: 14px;
   ${truncateText}
`;

const TrackAlbum = styled.div`
   flex: 1;
   font-size: 15px;
   ${truncateText}
`;

const TrackAlbumLink = styled(Link)`
   &:hover {
      text-decoration: underline;
   }

   ${StyledTrackItem}:hover & {
      color: ${(p) => p.theme.colors.text.normal};
   }
`;

const TrackDuration = styled.div`
   margin-left: 30px;
   text-align: right;
   font-size: 14px;
`;

export default TrackItem;
