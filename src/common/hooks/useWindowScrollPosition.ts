import { useEffect, useState } from 'react';

// TODO: improve performance (throttle)
const useWindowScrollPosition = () => {
   const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

   const handleScroll = () => {
      setPosition({
         x: window.scrollX,
         y: window.scrollY,
      });
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return position;
};

export default useWindowScrollPosition;
