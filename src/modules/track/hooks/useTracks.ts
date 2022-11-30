import { useInfiniteQuery } from 'react-query';
import api from '@utils/api';
import Track from '@modules/track/models/Track';

const useTracks = (searchQuery: string, limit: number) => {
   const fetchTracks = async (
      url: string | null,
      signal: AbortSignal | undefined
   ): Promise<{ tracks: Track[]; nextPage: string | null }> => {
      const data = await api.get<any>(
         url ?? `/search?q=${searchQuery}&type=track&market=HU&limit=${limit}`,
         {
            signal,
         }
      );

      return {
         tracks: data.tracks.items.map((track: any) => new Track(track)),
         nextPage: data.tracks.next,
      };
   };

   return useInfiniteQuery({
      queryKey: ['search-tracks', searchQuery, limit],
      queryFn: ({ pageParam, signal }) => fetchTracks(pageParam, signal),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: searchQuery !== '',
   });
};

export default useTracks;
