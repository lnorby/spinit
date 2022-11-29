import { useQuery } from 'react-query';
import api from '@utils/api';
import Track from '@modules/track/models/Track';

const useArtistTopTracks = (artistId: string) => {
   const fetchTracks = async (): Promise<Track[]> => {
      const data = await api.get<any>(`/artists/${artistId}/top-tracks?market=HU`);
      return data.tracks?.map((track: any) => new Track(track)) ?? [];
   };

   return useQuery({
      queryKey: ['artist-top-tracks', artistId],
      queryFn: () => fetchTracks(),
   });
};

export default useArtistTopTracks;
