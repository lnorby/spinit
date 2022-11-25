import ArtistItem from '@modules/artist/components/ArtistItem';
import Grid from '@components/Grid/Grid';
import { Artist } from '@modules/artist/types';

type ArtistListProps = {
   artists: Array<Artist>;
};

const ArtistList = ({ artists }: ArtistListProps) => {
   return (
      <Grid gap={24} minColumnWidth={170}>
         {artists.map((artist) => (
            <ArtistItem key={artist.id} artist={artist} />
         ))}
      </Grid>
   );
};

export default ArtistList;
