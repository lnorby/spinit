import api from '@utils/api';
import Artist from '@modules/artist/models/Artist';

const getArtist = async (id: string): Promise<Artist> => {
   const data = await api.get<any>(`/artists/${id}`);
   return new Artist(data);
};

export default getArtist;
