import { useQuery } from 'react-query';
import api from '@utils/api';
import Artist from '@modules/artist/models/Artist';

const useArtists = (searchQuery: string, limit: number) => {
   const fetchArtists = async (): Promise<Artist[]> => {
      const data = await api.get<any>(
         `/search/?q=${searchQuery}&type=artist&market=HU&limit=${limit}`
      );
      return data.artists?.items?.map((artist: any) => new Artist(artist)) ?? [];
   };

   return useQuery({
      queryKey: [
         'search-artists',
         {
            query: searchQuery,
            limit: limit,
         },
      ],
      queryFn: () => fetchArtists(),
      enabled: searchQuery !== '',
      keepPreviousData: true,
   });
};

export default useArtists;
