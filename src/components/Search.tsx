import { useEffect, useState } from "react"
import { Link } from "react-router";
import { getCities } from "../API/api";
import { CitiesResponse } from "../types";
import Flag from 'react-world-flags'

import { AnimatePresence, motion } from "motion/react"

export const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([] as CitiesResponse[] | []);

    useEffect(() => {
        if (searchInput.length > 2) {
            getCities(searchInput).then((data) => setSearchResults(data));
        } else {
            setSearchResults([]);
        }
    }, [searchInput])

    return (
        <div className="relative w-full">
            <input type="text" placeholder="Search city..." className="bg-[#282828] w-full rounded-4xl p-4 outline-none"
                value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />

            <AnimatePresence>
                {searchResults?.length > 0 &&
                    <motion.div
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -25 }}
                        className="flex flex-col bg-[#282828] border-2 border-gray-500 absolute w-full mt-4 z-50 rounded-4xl">
                        <span className="p-2 border-b-2 border-gray-500 text-center ">
                            Search results: {searchResults.length}
                        </span>
                        {
                            searchResults.map((city) =>
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: -25 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -25 }}
                                        layout
                                    >
                                        <Link
                                            className="p-2 flex gap-1  items-center border-b-2  border-gray-500 last:border-b-0"
                                            onClick={() => setSearchInput('')}
                                            to={`/forecast?lat=${city.lat}&lon=${city.lon}&city=${city.name}`}
                                            key={city.lat}>
                                            <Flag code={city.country} height={20} width={20} />
                                            {city.name}{city.state && `, ${city.state}`}
                                        </Link>
                                    </motion.div>
                                </AnimatePresence>
                            )
                        }
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}
