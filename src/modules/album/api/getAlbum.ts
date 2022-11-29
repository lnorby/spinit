import api from '@utils/api';
import Album from '@modules/album/models/Album';

const getAlbum = async (id: string): Promise<Album> => {
   const data = await api.get<any>(`/albums/${id}`);
   return new Album(data);
};

export default getAlbum;
