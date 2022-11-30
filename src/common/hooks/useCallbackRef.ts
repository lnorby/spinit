import { useLayoutEffect, useRef } from 'react';

const useCallbackRef = (callback: () => void) => {
   const callbackRef = useRef(callback);

   useLayoutEffect(() => {
      callbackRef.current = callback;
   }, [callback]);

   return callbackRef;
};

export default useCallbackRef;
