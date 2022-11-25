import api from '@utils/api';
import { Artist } from '@modules/artist/types';

const getArtist = async (id: string): Promise<Artist> => {
   const data = await api.get(`/artists/${id}`);

   return {
      id: data.id,
      name: data.name,
      image: data.images?.find((image: any) => image.width <= 700 && image.width >= 300)?.url ?? '',
      url: `/artist/${data.id}`,
   };
};

export default getArtist;
