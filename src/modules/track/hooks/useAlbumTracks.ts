import { useQuery } from 'react-query';
import api from '@utils/api';
import Track from '@modules/track/models/Track';

const useAlbumTracks = (albumId: string, limit: number) => {
   const fetchTracks = async (): Promise<Track[]> => {
      const data = await api.get<any>(
         `/albums/${albumId}/tracks?market=HU&limit=${limit}&offset=0`
      );
      return data.items?.map((track: any) => new Track(track)) ?? [];
   };

   return useQuery({
      queryKey: ['album-tracks', albumId],
      queryFn: () => fetchTracks(),
      keepPreviousData: true,
   });
};

export default useAlbumTracks;
