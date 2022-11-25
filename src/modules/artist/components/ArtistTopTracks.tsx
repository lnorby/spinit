import { useState } from 'react';
import useArtistTopTracks from '@modules/track/hooks/useArtistTopTracks';
import TrackList from '@modules/track/components/TrackList';
import styled from 'styled-components';

type ArtistTopTracksProps = {
   artistId: string;
};

const ArtistTopTracks = ({ artistId }: ArtistTopTracksProps) => {
   const [allTopTracksVisible, setAllTopTracksVisible] = useState(false);

   const query = useArtistTopTracks(artistId);

   return (
      <>
         {query.isLoading ? <p>Betöltés...</p> : null}
         {query.isError ? <p>Nem sikerült betölteni a tartalmat.</p> : null}
         {query.data ? (
            <>
               <TrackList
                  tracks={query.data}
                  limit={allTopTracksVisible ? -1 : 5}
                  positionByTrackNumber={false}
                  showAlbumImage={true}
                  showArtists={false}
                  showAlbumName={true}
               />
               <ToggleAllButton onClick={() => setAllTopTracksVisible((state) => !state)}>
                  {allTopTracksVisible ? 'Csak a lényeget' : 'Továbbiak'}
               </ToggleAllButton>
            </>
         ) : null}
      </>
   );
};

const ToggleAllButton = styled.button`
   padding: 16px;
   font-size: 12px;
   font-weight: 700;
   letter-spacing: 1.2px;
   color: rgba(255, 255, 255, 0.7);
   text-transform: uppercase;

   &:hover {
      color: ${(p) => p.theme.colors.text.normal};
   }
`;

export default ArtistTopTracks;
