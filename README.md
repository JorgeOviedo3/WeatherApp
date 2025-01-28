# Weather App

This web application provides a simple way to check the weather forecast for any location in the world.

Just type the name of the city you are interested in and select it from the list of suggestions. The app will then show you the current weather, as well as a 15-day forecast with hourly data and detailed information such as temperature, minimum and maximum temperature, and cloudiness.

### Tech Stack

This project is built using [Vite](https://vitejs.dev/guide/).

**Core technologies**

- React
- React Router
- Tailwind CSS
- Framer Motion

### API

> This project features data from [Visual Crossing](https://www.visualcrossing.com/), [Open Weather](https://openweathermap.org/) and [Geonames API](http://www.geonames.org/)

### Run Locally

1. Clone the project

```bash
  git clone https://github.com/JorgeOviedo3/WeatherApp
```

2. Go to the project directory

```bash
  cd ./WeatherApp
```

3. Install dependencies

```bash
  pnpm install
```

4. Create .env file on root and add:

```env
  VITE_OPENWEATHER_APIKEY=yourapikey
  VITE_VISUALCROSSING_APIKEY=yourapikey
  VITE_GEONAMES_USERNAME=yourusername
```

> Obtain your API keys from these sites: [Open Weather](https://openweathermap.org/), [Visual Crossing](https://www.visualcrossing.com/), [Geonames](https://www.geonames.org/)

> Note: After creating geonames account you need to go to [Manage Account](https://www.geonames.org/manageaccount) and enable the Free Web Services if you haven't yet.

5. Start the server

```bash
  pnpm run dev
```

To view it in your browser, open http://localhost:5173
