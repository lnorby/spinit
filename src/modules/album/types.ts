import { Artist } from '@modules/artist/types';

export type AlbumType = 'album' | 'single' | 'compilation';

export type Album = {
   id: string;
   name: string;
   type: AlbumType;
   releaseDate: string;
   image: string;
   artists: Array<Artist>;
   totalTracks: number;
   url: string;
};
