import {useEffect, useRef} from 'react';
import {useWindowHeight} from '@react-hook/window-size';
import useWindowScroll from '@react-hook/window-scroll';

type ScrollObserverProps = {
   onTrigger: () => void;
};

const ScrollObserver = ({ onTrigger }: ScrollObserverProps) => {
   const ref = useRef<HTMLDivElement>(null);
   const windowHeight = useWindowHeight();
   const windowScrollPosition = useWindowScroll();

   useEffect(() => {
      if (ref.current && ref.current.getBoundingClientRect().top < windowHeight * 1.75) {
         onTrigger();
      }
   }, [windowScrollPosition, windowHeight]);

   return <div ref={ref}></div>;
};

export default ScrollObserver;
