import { WiAlien, WiBarometer, WiCloudy, WiDayCloudy, WiDaySnow, WiDaySunny, WiFog, WiNightAltCloudy, WiNightClear, WiRain, WiRaindrop, WiRainMix, WiSnowflakeCold, WiWindy } from "react-icons/wi";

import { Conditions } from "../types"
import { ReactNode } from "react";

import { motion } from "motion/react";
import { MdOutlineVisibility } from "react-icons/md";
import { LiaBullseyeSolid } from "react-icons/lia";

interface ForecastDayProps {
    conditions: Conditions;
    dayConditions: Conditions;
}

interface WeatherDetailProps {
    icon: ReactNode;
    text: string;
    value: number;
    unit: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon, text, value, unit }) => (
    <div className="flex justify-center items-center flex-col w-[33%]">
        <div className="min-h-[50px] min-w-[50px] flex justify-center items-center">{icon}</div>

        <span>{value}{unit}</span>
        <span>{text}</span>
    </div>
);

export const ForecastDay = ({ conditions, dayConditions }: ForecastDayProps) => {
    const iconObj = {
        "clear-day": <WiDaySunny size={150} />,
        "clear-night": <WiNightClear size={150} />,
        "partly-cloudy-day": <WiDayCloudy size={150} />,
        "partly-cloudy-night": <WiNightAltCloudy size={150} />,
        cloudy: <WiCloudy size={150} />,
        fog: <WiFog size={150} />,
        "freezing-rain": <WiRainMix size={150} />,
        "freezing-snow": <WiSnowflakeCold size={150} />,
        "rain": <WiRain size={150} />,
        "snow": <WiDaySnow size={150} />,
        "wind": <WiWindy size={150} />,
    }

    const animations = {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    }

    console.log(dayConditions);

    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            key={conditions.datetimeEpoch}
            transition={{
                type: "ease-in-out",
                stiffness: 260,
                damping: 20,
            }}
            className="mt-8"
        >
            <div className="p-5 bg-[#282828] rounded-4xl shadow-xl">
                <div className="flex justify-between align-center">
                    <div className="w-50">
                        {iconObj[conditions.icon]}
                    </div>
                    <div className="flex flex-col items-start gap-1 w-[50%] justify-center">
                        <span>{conditions.conditions}</span>
                        <span>{conditions.description}</span>
                        <span className="text-5xl font-bold">{conditions.temp}°</span>
                    </div>
                </div>
                <span className="text-white/60">{dayConditions.description}</span>

            </div>
            <div className="flex flex-wrap p-5 mt-5 bg-[#282828] rounded-4xl align-center shadow-xl">
                <WeatherDetail
                    text="Humidity"
                    value={conditions.humidity} unit="%"
                    icon={<WiRaindrop size={50} />}
                />
                <WeatherDetail
                    text="Pressure"
                    value={conditions.pressure} unit="hpa"
                    icon={<WiBarometer size={50} />}
                />
                <WeatherDetail
                    text="UV"
                    value={conditions.uvindex} unit=""
                    icon={<WiDaySunny size={50}
                    />}
                />
                <WeatherDetail
                    text="Precipitation"
                    value={conditions.precip} unit="mm"
                    icon={<WiRain size={50} />}
                />
                <WeatherDetail
                    text="Wind"
                    value={conditions.windspeed} unit="km/h"
                    icon={<WiWindy size={50} />}
                />
                <WeatherDetail
                    text="Visibility"
                    value={conditions.visibility} unit="km"
                    icon={<LiaBullseyeSolid size={35} />}
                />
            </div>
            {dayConditions.sunrise && dayConditions.sunset &&
                <div className="p-5 mt-5 bg-[#282828] rounded-4xl flex justify-between shadow-xl">
                    <span>
                        <p>{dayConditions.sunrise?.slice(0, -3)}</p>
                        <p>Sunrise</p>
                    </span>
                    <span>
                        <p>{dayConditions.sunset?.slice(0, -3)}</p>
                        <p>Sunset</p>
                    </span>
                </div>
            }
            <div>{dayConditions.source}</div>
        </motion.div>
    )
}