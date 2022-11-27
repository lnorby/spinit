import { useQuery } from 'react-query';
import api from '@utils/api';
import Artist from '@modules/artist/models/Artist';

const useArtists = (searchQuery: string, limit: number) => {
   const fetchArtists = async (): Promise<Artist[]> => {
      const data = await api.get(`/search/?q=${searchQuery}&type=artist&market=HU&limit=${limit}`);

      return (
         data.artists?.items?.map(
            (artist: any): Artist => ({
               id: artist.id,
               name: artist.name,
               image:
                  artist.images?.find((image: any) => image.width <= 700 && image.width >= 300)
                     ?.url ?? '',
               url: `/artist/${artist.id}`,
            })
         ) ?? []
      );
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
