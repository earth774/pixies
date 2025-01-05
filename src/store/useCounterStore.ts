import { create } from 'zustand';

// Define the store's state and actions
interface WidthState {
    width: number;
    setWidth: (width: number) => void;
}

// Create the store
const useWidthStore = create<WidthState>((set) => ({
    width: 50,
    setWidth: (width: number) => set({ width }),
}));

export default useWidthStore;