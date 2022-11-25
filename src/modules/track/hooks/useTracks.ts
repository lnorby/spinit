import { useQuery } from 'react-query';
import { Track } from '@modules/track/types';
import api from '@utils/api';
import { formatDuration } from '@modules/track/utils';
import { Artist } from '@modules/artist/types';

const useTracks = (searchQuery: string, limit: number) => {
   const fetchTracks = async (): Promise<Array<Track>> => {
      const data = await api.get(`/search?q=${searchQuery}&type=track&market=HU&limit=${limit}`);

      return (
         data.tracks?.items?.map(
            (track: any): Track => ({
               id: track.id,
               name: track.name,
               duration: formatDuration(track.duration_ms),
               trackNumber: track.track_number,
               album: {
                  id: track.album.id,
                  name: track.album.name,
                  type: track.album.album_type,
                  image:
                     track.album.images?.find(
                        (image: any) => image.width <= 700 && image.width >= 300
                     )?.url ?? '',
                  artists: track.album.artists.map((artist: any) => ({
                     id: artist.id,
                     name: artist.name,
                     image:
                        artist.images?.find(
                           (image: any) => image.width <= 700 && image.width >= 300
                        )?.url ?? '',
                     url: `/artist/${artist.id}`,
                  })),
                  releaseDate: track.album.release_date,
                  totalTracks: track.album.total_tracks,
                  url: `/album/${track.album.id}`,
               },
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
      queryKey: [
         'search-tracks',
         {
            query: searchQuery,
            limit: limit,
         },
      ],
      queryFn: () => fetchTracks(),
      enabled: searchQuery !== '',
      keepPreviousData: true,
   });
};

export default useTracks;