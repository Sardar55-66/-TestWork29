export interface WeatherData {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
      main: string;
    }[];
    wind: {
      speed: number;
    };
  }