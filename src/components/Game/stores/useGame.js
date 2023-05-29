import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useGame = create(
  subscribeWithSelector((set) => ({
    blocksCount: 10,
    startTime: 0,
    endTime: 0,
    blocksSeed: 0,
    /**
     * Phasees:
     * - ready
     * - playing
     * - ended
     */
    phase: 'ready',
    start: () =>
      set((state) => {
        if (state.phase === 'ready')
          return { phase: 'playing', startTime: Date.now() };

        return {};
      }),
    end: () =>
      set((state) => {
        if (state.phase === 'playing')
          return { phase: 'ended', endTime: Date.now() };

        return {};
      }),
    restart: () =>
      set((state) => {
        if (state.phase === 'playing' || state.phase === 'ended') {
          return { phase: 'ready', blocksSeed: Math.random() };
        }

        return {};
      }),
  }))
);

export default useGame;
