import { Search } from "../components/Search";
import { AnimatedPage } from "./AnimatedPage";

export function Home() {
    return (
        <AnimatedPage>
            <div id="home" className="text-white flex flex-col select-none">
                <h1 className="text-4xl font-bold mb-4">Weather App</h1>
                <Search />
            </div>
        </AnimatedPage>
    )
}
