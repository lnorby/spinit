import api from '@utils/api';
import Track from '@modules/track/models/Track';

const getTrack = async (id: string): Promise<Track> => {
   const data = await api.get<any>(`/tracks/${id}`);
   return new Track(data);
};

export default getTrack;
