import {useInfiniteQuery} from 'react-query';
import api from '@utils/api';
import Album, {AlbumType} from '@modules/album/models/Album';

const useArtistAlbums = (artistId: string, albumType: AlbumType, limit: number) => {
   const fetchAlbums = async (
      url: string | null,
      signal: AbortSignal | undefined
   ): Promise<{ albums: Album[]; nextPage: string | null }> => {
      const data = await api.get<any>(
         url ?? `/artists/${artistId}/albums?market=HU&include_groups=${albumType}&limit=${limit}`,
         {
            signal,
         }
      );

      return {
         albums: data.items.map((album: any) => new Album(album)),
         nextPage: data.next,
      };
   };

   return useInfiniteQuery({
      queryKey: ['artist-albums', artistId, albumType, limit],
      queryFn: ({ pageParam, signal }) => fetchAlbums(pageParam, signal),
      getNextPageParam: (lastPage) => lastPage.nextPage,
   });
};

export default useArtistAlbums;
