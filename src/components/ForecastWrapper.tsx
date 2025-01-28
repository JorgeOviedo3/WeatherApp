import { useEffect, useState } from "react";
import Flag from "react-world-flags";

import { CityResponse, ForecastResponse } from "../types";
import { ForecastDay } from "./ForecastDay";
import { SelectTime } from "./SelectTime";
import { SelectDay } from "./SelectDay";

import { AnimatePresence } from "motion/react";

import _ from 'lodash';

interface ForecastWrapperProps {
    forecast: ForecastResponse,
    city: CityResponse,
    cityParam: string | null
}

export const ForecastWrapper = ({ forecast, city, cityParam }: ForecastWrapperProps) => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedTime, setSelectedTime] = useState(0);
    const [nowTime, setNowTime] = useState(0);

    useEffect(() => {
        setNowTime(parseInt(forecast.currentConditions.datetime.slice(0, -6)));
        setSelectedDay(0);
    }, [forecast])

    return (
        <div className="mt-8">
            <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Flag code={city.countryCode} height={25} width={25} />
                <p>{cityParam}, {city.adminName1}</p>
            </div>
            <div className="text-md mb-4">
                {forecast.description}
            </div>
            <SelectDay
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                days={forecast.days}
            />
            <SelectTime
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedDay={selectedDay}
                nowTime={nowTime}
                isToday={selectedDay === 0}
            />
            <AnimatePresence mode="wait">
                {forecast.days[selectedDay].hours && forecast.days[selectedDay].hours[selectedTime] ? (
                    <ForecastDay
                        dayConditions={_.omit(forecast.days[selectedDay], 'hours')}
                        conditions={nowTime === selectedTime && selectedDay === 0 ?
                            forecast.currentConditions
                            :
                            forecast.days[selectedDay].hours[selectedTime]}
                    />
                ) : (
                    <div>No forecast available</div>
                )}
            </AnimatePresence>
        </div>
    )
}
