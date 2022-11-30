import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PlaylistState = {
   trackIds: string[];
   currentIndex: number;
};

const initialState: PlaylistState = {
   trackIds: [],
   currentIndex: -1,
};

const playlistSlice = createSlice({
   name: 'playlist',
   initialState,
   reducers: {
      addTracks: (state, action: PayloadAction<string[]>) => {
         state.trackIds = action.payload;
         state.currentIndex = 0;
      },
      removeTrack: (state, action: PayloadAction<string>) => {
         state.trackIds.filter((trackId) => trackId !== action.payload);
      },
      playNextTrack: (state) => {
         state.currentIndex += 1;
      },
      playPreviousTrack: (state) => {
         state.currentIndex -= 1;
      },
   },
});

export const { addTracks, removeTrack, playNextTrack, playPreviousTrack } = playlistSlice.actions;

export default playlistSlice;
