import {Inter} from '@next/font/google';

const primaryFont = Inter({
   subsets: ['latin', 'latin-ext'],
});

const theme = {
   fonts: {
      primary: primaryFont.style.fontFamily,
   },
   colors: {
      accent: {
         primary: '#1db954',
         secondary: '#1ed760',
      },
      text: {
         normal: '#fff',
         soft: '#b3b3b3',
         inverse: '#000',
      },
   },
};

export default theme;
