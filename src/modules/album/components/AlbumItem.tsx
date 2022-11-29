import Card from '@components/Card/Card';
import ArtistLinks from '@components/ArtistLinks/ArtistLinks';
import Album from '@modules/album/models/Album';

type AlbumItemProps = {
   album: Album;
   showArtists: boolean;
};

// TODO: play button on hover
const AlbumItem = ({ album, showArtists }: AlbumItemProps) => {
   const extras = (
      <>
         {album.releaseYear}
         {' · '}
         {showArtists ? <ArtistLinks artists={album.artists} /> : album.typeName}
      </>
   );

   return (
      <Card title={album.name} image={album.primaryImage?.url} extras={extras} url={album.url} />
   );
};

export default AlbumItem;
