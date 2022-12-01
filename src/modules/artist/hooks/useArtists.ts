import { useInfiniteQuery } from 'react-query';
import api from '@utils/api';
import Artist from '@modules/artist/models/Artist';

const useArtists = (searchQuery: string, limit: number) => {
   const fetchArtists = async (
      url: string | null,
      signal: AbortSignal | undefined
   ): Promise<{ artists: Artist[]; nextPage: string | null }> => {
      const data = await api.get<any>(
         url ?? `/search/?q=${searchQuery}&type=artist&market=HU&limit=${limit}`,
         {
            signal,
         }
      );

      return {
         artists: data.artists.items.map((artist: any) => new Artist(artist)),
         nextPage: data.artists.next,
      };
   };

   return useInfiniteQuery({
      queryKey: ['search-artists', searchQuery, limit],
      queryFn: ({ pageParam, signal }) => fetchArtists(pageParam, signal),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: searchQuery !== '',
   });
};

export default useArtists;
