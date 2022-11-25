import { useQuery } from 'react-query';
import { Track } from '@modules/track/types';
import api from '@utils/api';
import { formatDuration } from '@modules/track/utils';
import { Artist } from '@modules/artist/types';

const useAlbumTracks = (albumId: string, limit: number) => {
   const fetchTracks = async (): Promise<Array<Track>> => {
      const data = await api.get(`/albums/${albumId}/tracks?market=HU&limit=${limit}&offset=0`);

      return (
         data.items?.map(
            (track: any): Track => ({
               id: track.id,
               name: track.name,
               duration: formatDuration(track.duration_ms),
               trackNumber: track.track_number,
               artists:
                  track.artists?.map(
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
            })
         ) ?? []
      );
   };

   return useQuery({
      queryKey: ['album-tracks', albumId],
      queryFn: () => fetchTracks(),
      keepPreviousData: true,
   });
};

export default useAlbumTracks;
