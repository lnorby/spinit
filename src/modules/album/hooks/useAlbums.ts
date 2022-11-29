import { useQuery } from 'react-query';
import api from '@utils/api';
import Album from '@modules/album/models/Album';

const useAlbums = (searchQuery: string, limit: number) => {
   const fetchAlbums = async (): Promise<Album[]> => {
      const data = await api.get<any>(
         `/search/?q=${searchQuery}&type=album&market=HU&limit=${limit}`
      );
      return data.albums?.items?.map((album: any) => new Album(album)) ?? [];
   };

   return useQuery({
      queryKey: [
         'search-albums',
         {
            query: searchQuery,
            limit: limit,
         },
      ],
      queryFn: () => fetchAlbums(),
      enabled: searchQuery !== '',
      keepPreviousData: true,
   });
};

export default useAlbums;
