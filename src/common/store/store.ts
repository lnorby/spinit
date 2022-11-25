import { configureStore } from '@reduxjs/toolkit';
import playlistSlice from '@store/playlistSlice';

const store = configureStore({
   reducer: {
      playlist: playlistSlice.reducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
