import Album from '@modules/album/models/Album';
import Artist from '@modules/artist/models/Artist';

type Track = {
   id: string;
   name: string;
   trackNumber: number;
   duration: string;
   album?: Album;
   artists: Artist[];
};

export default Track;
