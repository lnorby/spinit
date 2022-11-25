import { useQuery } from 'react-query';
import api from '@utils/api';
import Album, { AlbumType } from '@modules/album/models/Album';
import Artist from '@modules/artist/models/Artist';

const useArtistAlbums = (artistId: string, albumType: AlbumType, limit: number) => {
   const fetchAlbums = async (): Promise<Array<Album>> => {
      const data = await api.get(
         `/artists/${artistId}/albums?market=HU&include_groups=${albumType}${
            limit ? `&limit=${limit}` : ''
         }`
      );

      return (
         data.items?.map(
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
      queryKey: ['artist-albums', artistId, albumType],
      queryFn: () => fetchAlbums(),
      keepPreviousData: true,
   });
};

export default useArtistAlbums;
