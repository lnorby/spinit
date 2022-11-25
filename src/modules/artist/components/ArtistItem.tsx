import Card from '@components/Card/Card';
import { Artist } from '@modules/artist/types';

type ArtistItemProps = {
   artist: Artist;
};

// TODO: play button on hover
const ArtistItem = ({ artist }: ArtistItemProps) => {
   return (
      <Card
         title={artist.name}
         image={artist.image}
         roundedImage={true}
         extras="Előadó"
         url={artist.url}
      />
   );
};

export default ArtistItem;
