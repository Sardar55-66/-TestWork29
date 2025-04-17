import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherStore } from '@/types/WeatherStore';

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      city: '',
      weather: null,
      favorites: [],
      hasHydrated: false,
      setCity: (city) => set({ city }),
      setWeather: (weather) => set({ weather }),
      clearWeather: () => set({ city: '', weather: null }),
      addFavorite: (city) => {
        if (!get().favorites.includes(city)) {
          set({ favorites: [...get().favorites, city] });
        }
      },
      removeFavorite: (city) => {
        set({ favorites: get().favorites.filter((c) => c !== city) });
      },
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'weather-store',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
