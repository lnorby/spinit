import Grid from '@components/Grid/Grid';
import AlbumItem from '@modules/album/components/AlbumItem';
import Album from '@modules/album/models/Album';

type AlbumListProps = {
   albums: Album[];
   showArtists: boolean;
};

const AlbumList = ({ albums, showArtists }: AlbumListProps) => {
   return (
      <Grid gap={24} minColumnWidth={170}>
         {albums.map((album) => (
            <AlbumItem key={album.id} album={album} showArtists={showArtists} />
         ))}
      </Grid>
   );
};

export default AlbumList;
