const API_URLS = {
  GET_CITIES: (city: string) =>
    `http://api.openweathermap.org/geo/1.0/direct?q=
    ${city},&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_APIKEY}`,
  GET_FORECAST: (lat: number, lon: number) =>
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
    ${lat},${lon}?key=${import.meta.env.VITE_VISUALCROSSING_APIKEY}&unitGroup=metric`,
  GET_CITY_NAME: (lat: number, lon: number) =>
    `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=sabahrahal`,
};

export async function getCities(city: string) {
  try {
    const response = await fetch(API_URLS.GET_CITIES(city));
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getForecast(lat: number, lon: number) {
  try {
    const response = await fetch(API_URLS.GET_FORECAST(lat, lon));
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCityName(lat: number, lon: number) {
  try {
    const response = await fetch(API_URLS.GET_CITY_NAME(lat, lon));
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.geonames[0];
  } catch (error) {
    console.log(error);
  }
}
