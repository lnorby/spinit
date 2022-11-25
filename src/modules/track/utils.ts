export const formatDuration = (durationInMs: number): string => {
   const durationInSeconds = Math.floor(durationInMs / 1000);
   const durationInMinutes = Math.floor(durationInSeconds / 60);

   return `${durationInMinutes}:${String(durationInSeconds - 60 * durationInMinutes).padStart(
      2,
      '0'
   )}`;
};
