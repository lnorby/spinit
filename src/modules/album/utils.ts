import { AlbumType } from '@modules/album/models/Album';

const typeNames = {
   album: 'Album',
   single: 'Kislemez',
   compilation: 'Válogatás',
};

export const getAlbumTypeName = (type: AlbumType) => {
   return typeNames[type];
};
