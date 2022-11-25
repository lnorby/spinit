import { Album } from '@modules/album/types';
import { Artist } from '@modules/artist/types';

export type Track = {
   id: string;
   name: string;
   trackNumber: number;
   duration: string;
   album?: Album;
   artists: Array<Artist>;
};
