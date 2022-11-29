import Image from '@models/Image';

class Artist {
   id: string;
   name: string;
   images: Image[];

   constructor(model: any) {
      this.id = model.id;
      this.name = model.name;
      this.images = model.images?.map((image: any) => new Image(image)) ?? [];
   }

   get primaryImage(): Image | undefined {
      return this.images.find((image) => image.width >= 300 && image.width <= 700);
   }

   get url(): string {
      return `/artist/${this.id}`;
   }

   toJSON() {
      return {
         id: this.id,
         name: this.name,
         images: this.images.map((image) => image.toJSON()),
         primaryImage: this.primaryImage?.toJSON() ?? null,
         url: this.url,
      };
   }
}

export default Artist;
