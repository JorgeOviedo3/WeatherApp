import { Conditions } from "../types";

import { motion } from "motion/react"


interface SelectDayProps {
    selectedDay: number;
    setSelectedDay: (day: number) => void;
    days: Conditions[]
}

export const SelectDay = ({ selectedDay, setSelectedDay, days }: SelectDayProps) => {

    function transformDate(date: string) {
        const dateObj = new Date(date);
        return {
            dayNumber: dateObj.getDate(),
            month: dateObj.getMonth() + 1,
            dayString: dateObj.toLocaleDateString("en-US", { weekday: 'long' })
        }
    }

    return (
        <div className="flex overflow-x-scroll gap-5 align-center justify-start no-scrollbar">
            {days.map((date, i) => {
                const { dayNumber, month, dayString } = transformDate(date.datetime);
                return (
                    <div key={date.datetime}
                        onClick={() => setSelectedDay(i)}
                        className={`${selectedDay === i ? "border-none" : "hover:text-white/60"
                            } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 text-center min-w-30 cursor-pointer border-1 border-white/60`}
                    >
                        {selectedDay === i && (
                            <motion.span
                                layoutId="bubble2"
                                className="absolute inset-0 z-10 bg-white mix-blend-difference"
                                style={{ borderRadius: 9999 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.2 }}
                            />
                        )}
                        {i === 0 ? "Today" : dayString} <br />
                        <span className={`${selectedDay !== i && "text-white/60"}`}>{dayNumber}/{month}</span>
                    </div>
                )
            })}
        </div>
    )
}
