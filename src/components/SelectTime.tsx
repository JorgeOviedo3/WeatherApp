import { useEffect, useRef } from "react";

import { motion } from "motion/react"

interface SelectTimeProps {
    selectedTime: number;
    setSelectedTime: (time: number) => void;
    selectedDay: number;
    nowTime: number;
    isToday: boolean;
}

export const SelectTime = ({ selectedTime, setSelectedTime, selectedDay, nowTime, isToday }: SelectTimeProps) => {

    const refs = useRef<HTMLButtonElement[] | [null]>([]);

    function formatHours(hours: number): string {
        return `${String(hours).padStart(2, '0')}:00`;
    }

    useEffect(() => {
        if (isToday) {
            setSelectedTime(nowTime);
        } else {
            setSelectedTime(0);
        }
    }, [isToday, selectedDay, nowTime])

    useEffect(() => {
        if (refs.current) {
            if (refs?.current[selectedTime]) {
                refs.current[selectedTime].scrollIntoView();
            }
        }
    }, [selectedTime]);

    return (
        <div className="flex overflow-x-scroll gap-5 mt-2.5 align-center justify-start no-scrollbar">
            {Array.from({ length: 24 }, (_, i) => (
                <button
                    key={i}
                    onClick={() => setSelectedTime(i)}
                    ref={(ref) => { if (refs.current) refs.current[i] = ref }}
                    className={`${selectedTime === i ? "border-none" : " text-white/60"
                        } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 cursor-pointer border-1 border-white/60`}
                >
                    {selectedTime === i && (
                        <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 z-10 bg-white mix-blend-difference"
                            style={{ borderRadius: 9999 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.2 }}
                        />
                    )}
                    {nowTime === i && isToday ? "Now" : formatHours(i)}
                </button>
            ))}
        </div>
    )
}
