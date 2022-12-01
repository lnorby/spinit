import {useInfiniteQuery} from 'react-query';
import api from '@utils/api';
import Album from '@modules/album/models/Album';

const useAlbums = (searchQuery: string, limit: number) => {
   const fetchAlbums = async (
      url: string | null,
      signal: AbortSignal | undefined
   ): Promise<{ albums: Album[]; nextPage: string | null }> => {
      const data = await api.get<any>(
         url ?? `/search/?q=${searchQuery}&type=album&market=HU&limit=${limit}`,
         {
            signal,
         }
      );

      return {
         albums: data.albums.items.map((album: any) => new Album(album)),
         nextPage: data.albums.next,
      };
   };

   return useInfiniteQuery({
      queryKey: ['search-albums', searchQuery, limit],
      queryFn: ({ pageParam, signal }) => fetchAlbums(pageParam, signal),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: searchQuery !== '',
   });
};

export default useAlbums;
