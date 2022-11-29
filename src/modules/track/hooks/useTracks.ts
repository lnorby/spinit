import { useQuery } from 'react-query';
import api from '@utils/api';
import Track from '@modules/track/models/Track';

const useTracks = (searchQuery: string, limit: number) => {
   const fetchTracks = async (): Promise<Track[]> => {
      const data = await api.get<any>(
         `/search?q=${searchQuery}&type=track&market=HU&limit=${limit}`
      );
      return data.tracks?.items?.map((track: any) => new Track(track)) ?? [];
   };

   return useQuery({
      queryKey: [
         'search-tracks',
         {
            query: searchQuery,
            limit: limit,
         },
      ],
      queryFn: () => fetchTracks(),
      enabled: searchQuery !== '',
      keepPreviousData: true,
   });
};

export default useTracks;
