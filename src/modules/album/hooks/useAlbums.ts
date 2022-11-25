import { useQuery } from 'react-query';
import api from '@utils/api';
import Album from '@modules/album/models/Album';
import Artist from '@modules/artist/models/Artist';

const useAlbums = (searchQuery: string, limit: number) => {
   const fetchAlbums = async (): Promise<Array<Album>> => {
      const data = await api.get(`/search/?q=${searchQuery}&type=album&market=HU&limit=${limit}`);

      return (
         data.albums?.items?.map(
            (album: any): Album => ({
               id: album.id,
               name: album.name,
               type: album.album_type,
               releaseDate: album.release_date,
               image:
                  album.images?.find((image: any) => image.width <= 700 && image.width >= 300)
                     ?.url ?? '',
               artists:
                  album.artists?.map(
                     (artist: any): Artist => ({
                        id: artist.id,
                        name: artist.name,
                        image:
                           artist.images?.find(
                              (image: any) => image.width <= 700 && image.width >= 300
                           )?.url ?? '',
                        url: `/artist/${artist.id}`,
                     })
                  ) ?? [],
               totalTracks: album.total_tracks,
               url: `/album/${album.id}`,
            })
         ) ?? []
      );
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
