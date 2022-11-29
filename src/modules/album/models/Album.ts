import Artist from '@modules/artist/models/Artist';
import Image from '@models/Image';

export type AlbumType = 'album' | 'single' | 'compilation';

class Album {
   id: string;
   name: string;
   type: AlbumType;
   releaseDate: Date;
   images: Image[];
   artists: Artist[];
   totalTracks: number;

   private static typeNames = {
      album: 'Album',
      single: 'Kislemez',
      compilation: 'Válogatás',
   };

   constructor(model: any) {
      this.id = model.id;
      this.name = model.name;
      this.type = model.album_type;
      this.releaseDate = new Date(model.release_date);
      this.images = model.images?.map((image: any) => new Image(image)) ?? [];
      this.artists = model.artists?.map((artist: any) => new Artist(artist)) ?? [];
      this.totalTracks = model.total_tracks;
   }

   get typeName(): string {
      return Album.typeNames[this.type];
   }

   get releaseYear(): number {
      return this.releaseDate.getFullYear();
   }

   get primaryImage(): Image | undefined {
      return this.images.find((image) => image.width >= 300 && image.width <= 700);
   }

   get url(): string {
      return `/album/${this.id}`;
   }

   toJSON() {
      return {
         id: this.id,
         name: this.name,
         type: this.type,
         typeName: this.typeName,
         releaseDate: this.releaseDate.getDate(),
         releaseYear: this.releaseYear,
         images: this.images.map((image) => image.toJSON()),
         primaryImage: this.primaryImage?.toJSON() ?? null,
         artists: this.artists.map((artist) => artist.toJSON()),
         totalTracks: this.totalTracks,
         url: this.url,
      };
   }
}

export default Album;
