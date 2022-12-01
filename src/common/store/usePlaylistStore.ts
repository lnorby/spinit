import create from 'zustand';

type PlaylistStoreState = {
   trackIds: string[];
   currentIndex: number;
   addTracks: (trackIds: string[]) => void;
   nextTrack: () => void;
   previousTrack: () => void;
   currentTrackId: () => string;
};

const usePlaylistStore = create<PlaylistStoreState>((set, get) => ({
   trackIds: [],
   currentIndex: -1,
   addTracks: (trackIds) => set({ trackIds: trackIds, currentIndex: 0 }),
   nextTrack: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
   previousTrack: () => set((state) => ({ currentIndex: state.currentIndex - 1 })),
   currentTrackId: () => get().trackIds[get().currentIndex],
}));

export default usePlaylistStore;
