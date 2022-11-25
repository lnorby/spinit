import api from '@utils/api';
import { formatDuration } from '@modules/track/utils';
import { Track } from '@modules/track/types';
import { Artist } from '@modules/artist/types';

const getTrack = async (id: string): Promise<Track> => {
   const data = await api.get(`/tracks/${id}`);

   return {
      id: data.id,
      name: data.name,
      duration: formatDuration(data.duration_ms),
      trackNumber: data.track_number,
      album: {
         id: data.album.id,
         name: data.album.name,
         type: data.album.album_type,
         image:
            data.album.images?.find((image: any) => image.width <= 700 && image.width >= 300)
               ?.url ?? '',
         artists: data.album.artists.map(
            (artist: any): Artist => ({
               id: artist.id,
               name: artist.name,
               image:
                  artist.images?.find((image: any) => image.width <= 700 && image.width >= 300)
                     ?.url ?? '',
               url: `/artist/${artist.id}`,
            })
         ),
         releaseDate: data.album.release_date,
         totalTracks: data.album.total_tracks,
         url: `/album/${data.album.id}`,
      },
      artists:
         data.artists?.map(
            (artist: any): Artist => ({
               id: artist.id,
               name: artist.name,
               image:
                  artist.images?.find((image: any) => image.width <= 700 && image.width >= 300)
                     ?.url ?? '',
               url: `/artist/${artist.id}`,
            })
         ) ?? [],
   };
};

export default getTrack;
