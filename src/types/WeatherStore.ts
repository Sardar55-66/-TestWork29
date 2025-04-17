import { WeatherData } from "./WeatherData";


export interface WeatherStore {
    city: string;
    weather: WeatherData | null;
    favorites: string[];
    setCity: (city: string) => void;
    setWeather: (weather: WeatherData) => void;
    clearWeather: () => void;
    addFavorite: (city: string) => void;
    removeFavorite: (city: string) => void;
    clearFavorites: () => void;
    hasHydrated: boolean;
  }
  