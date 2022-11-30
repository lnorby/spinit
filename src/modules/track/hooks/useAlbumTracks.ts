import { useInfiniteQuery } from 'react-query';
import api from '@utils/api';
import Track from '@modules/track/models/Track';

const useAlbumTracks = (albumId: string, limit: number) => {
   const fetchTracks = async (
      url: string | null,
      signal: AbortSignal | undefined
   ): Promise<{ tracks: Track[]; nextPage: string | null }> => {
      const data = await api.get<any>(url ?? `/albums/${albumId}/tracks?market=HU&limit=${limit}`, {
         signal,
      });
      return {
         tracks: data.items.map((track: any) => new Track(track)),
         nextPage: data.next,
      };
   };

   return useInfiniteQuery({
      queryKey: ['album-tracks', albumId, limit],
      queryFn: ({ pageParam, signal }) => fetchTracks(pageParam, signal),
      getNextPageParam: (lastPage) => lastPage.nextPage,
   });
};

export default useAlbumTracks;
