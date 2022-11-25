import api from '@utils/api';
import { Album } from '@modules/album/types';
import { Artist } from '@modules/artist/types';

const getAlbum = async (id: string): Promise<Album> => {
   const data = await api.get(`/albums/${id}`);

   return {
      id: data.id,
      name: data.name,
      type: data.album_type,
      releaseDate: data.release_date,
      image: data.images?.find((image: any) => image.width <= 700 && image.width >= 300)?.url ?? '',
      artists:
         data.artists?.map(
            (artist: any): Artist => ({
               id: artist.id,
               name: artist.name,
               image:
                  artist.images?.filter((image: any) => image.width <= 700 && image.width >= 300)[0]
                     ?.url ?? '',
               url: `/artist/${artist.id}`,
            })
         ) ?? [],
      totalTracks: data.total_tracks,
      url: `/album/${data.id}`,
   };
};

export default getAlbum;
