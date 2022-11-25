import Card from '@components/Card/Card';
import ArtistLinks from '@components/ArtistLinks/ArtistLinks';
import { getAlbumTypeName } from '@modules/album/utils';
import Album from '@modules/album/models/Album';

type AlbumItemProps = {
   album: Album;
   showArtists: boolean;
};

// TODO: play button on hover
const AlbumItem = ({ album, showArtists }: AlbumItemProps) => {
   const extras = (
      <>
         {new Date(album.releaseDate).getFullYear()}
         {' · '}
         {showArtists ? <ArtistLinks artists={album.artists} /> : getAlbumTypeName(album.type)}
      </>
   );

   return <Card title={album.name} image={album.image} extras={extras} url={album.url} />;
};

export default AlbumItem;
