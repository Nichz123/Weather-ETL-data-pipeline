import "./button.css"
import search_weather from "./functions/search_weather.js"

export default function Button() {
    return(
        <button onClick={() => search_weather("Dallas", "TX", "US")}>Click Me!</button>
    )
}