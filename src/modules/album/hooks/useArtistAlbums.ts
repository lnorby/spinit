import { useQuery } from 'react-query';
import api from '@utils/api';
import Album, { AlbumType } from '@modules/album/models/Album';

const useArtistAlbums = (artistId: string, albumType: AlbumType, limit: number) => {
   const fetchAlbums = async (): Promise<Album[]> => {
      const data = await api.get<any>(
         `/artists/${artistId}/albums?market=HU&include_groups=${albumType}${
            limit ? `&limit=${limit}` : ''
         }`
      );
      return data.items?.map((album: any) => new Album(album)) ?? [];
   };

   return useQuery({
      queryKey: ['artist-albums', artistId, albumType],
      queryFn: () => fetchAlbums(),
      keepPreviousData: true,
   });
};

export default useArtistAlbums;
