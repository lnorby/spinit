import { useQuery } from 'react-query';
import api from '@utils/api';
import { Track } from '@modules/track/types';
import { formatDuration } from '@modules/track/utils';
import { Artist } from '@modules/artist/types';

const useArtistTopTracks = (artistId: string) => {
   const fetchTracks = async (): Promise<Array<Track>> => {
      const data = await api.get(`/artists/${artistId}/top-tracks?market=HU`);

      return (
         data.tracks?.map(
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
                  artists: track.album.artists.map(
                     (artist: any): Artist => ({
                        id: artist.id,
                        name: artist.name,
                        image:
                           artist.images?.find(
                              (image: any) => image.width <= 700 && image.width >= 300
                           )?.url ?? '',
                        url: `/artist/${artist.id}`,
                     })
                  ),
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
      queryKey: ['artist-top-tracks', artistId],
      queryFn: () => fetchTracks(),
   });
};

export default useArtistTopTracks;
