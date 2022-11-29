export default class Image {
   url: string;
   width: number;
   height: number;

   constructor(model: any) {
      this.url = model.url;
      this.width = model.width;
      this.height = model.height;
   }

   toJSON() {
      return {
         url: this.url,
         width: this.width,
         height: this.height,
      };
   }
}
