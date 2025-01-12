import { create } from 'zustand';

// Define the store's state and actions
interface WidthState {
    width: number;
    setWidth: (width: number) => void;
}

interface ColorState {
    color: string;
    setColor: (color: string) => void;
}

// Create the store
const useWidthStore = create<WidthState>((set) => ({
    width: 50,
    setWidth: (width: number) => set({ width }),
}));

const useColorStore = create<ColorState>((set) => ({
    color: "#3b82f6",
    setColor: (color: string) => set({ color }),
}));

export { useWidthStore, useColorStore };