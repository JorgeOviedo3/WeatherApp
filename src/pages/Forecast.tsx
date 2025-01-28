import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { AnimatedPage } from "./AnimatedPage";
import { ForecastWrapper } from "../components/ForecastWrapper";

import { getCityName, getForecast } from "../API/api";
import { CityResponse, ForecastResponse } from "../types";

import { Search } from "../components/Search";

export function Forecast() {
    const [forecast, setForecast] = useState(null as ForecastResponse | null);
    const [city, setCity] = useState(null as CityResponse | null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const cityParam = searchParams.get('city');

    useEffect(() => {
        getCityName(Number(lat), Number(lon))
            .then((data) => setCity(data)).catch(() => setError(true));
        getForecast(Number(lat), Number(lon))
            .then((data) => setForecast(data)).catch(() => setError(true));

        setLoading(false);
    }, [lat, lon])

    return (
        <AnimatedPage>
            <div id="forecast" className="text-white flex flex-col select-none">
                <h1 className="text-4xl font-bold mb-4">Weather App</h1>
                <Search />
                {loading && <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />}
                {error && <p>There was an error fetching the data, please try again.</p>}
                {!loading && !error && forecast && city &&
                    <ForecastWrapper forecast={forecast} city={city} cityParam={cityParam} />
                }
            </div>
        </AnimatedPage>
    )
}