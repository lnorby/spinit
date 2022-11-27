import Artist from '@modules/artist/models/Artist';

export type AlbumType = 'album' | 'single' | 'compilation';

type Album = {
   id: string;
   name: string;
   type: AlbumType;
   releaseDate: string;
   image: string;
   artists: Artist[];
   totalTracks: number;
   url: string;
};

export default Album;
