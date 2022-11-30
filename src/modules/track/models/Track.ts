import Album from '@modules/album/models/Album';
import Artist from '@modules/artist/models/Artist';

class Track {
   id: string;
   name: string;
   trackNumber: number;
   duration: string;
   album?: Album;
   artists: Artist[];

   constructor(model: any) {
      this.id = model.id;
      this.name = model.name;
      this.trackNumber = model.track_number;
      this.duration = Track.formatDuration(model.duration_ms);
      this.album = model.album ? new Album(model.album) : undefined;
      this.artists = model.artists?.map((artist: any) => new Artist(artist)) ?? [];
   }

   private static formatDuration(durationInMs: number): string {
      const durationInSeconds = Math.floor(durationInMs / 1000);
      const durationInMinutes = Math.floor(durationInSeconds / 60);
      return `${durationInMinutes}:${String(durationInSeconds - 60 * durationInMinutes).padStart(
         2,
         '0'
      )}`;
   }
}

export default Track;
