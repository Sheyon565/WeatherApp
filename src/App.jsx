import { useState, useEffect } from 'react'
import './App.css'
import WeatherDisplay from './components/WeatherDisplay.jsx'
import SearchForm from './components/SearchForm.jsx'
import ForecastDisplay from './components/ForecastDisplay.jsx'

function App() {
    const [submitedCity, setSubmitedCity] = useState('')
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);
    const KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${submitedCity}&appid=${KEY}&units=metric`;
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${submitedCity}&appid=${KEY}&units=metric`

    useEffect(() => {
        if (submitedCity) {
            setLoading(true);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    if (data.cod === 200) {
                        setWeather(data);
                        setError(null);
                    } else {
                        setError(data.message);
                        setWeather(null);
                    }
                })
                .catch(error => console.log("error", error))
            fetch(forecastApi)
                .then(response => response.json())
                .then(data => {
                    const dailyForecast = data.list.filter((item, index) => {
                        if (index === 0) return true;
                        if (index % 8 === 0) {
                            return true;
                        }
                        else false;
                    })
                    console.log(dailyForecast);
                    setForecast(dailyForecast);
                })
        }
    }, [submitedCity])

    return (
        <div
            className="md:p-10 min-h-screen">
            <div className="flex items-center flex-col p-5 gap-3 min-w-full">
                <SearchForm onSubmit={setSubmitedCity} />

                {loading && (
                    <div className="flex items-center justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="ml-2">
                            Fetching Weather...
                        </p>
                    </div>
                )}
                {weather && !error ? (
                    <div className="flex flex-col gap-2">
                        <WeatherDisplay weather={weather} bgColor={getBgColor(weather)} />
                        <ForecastDisplay forecast={forecast} />
                    </div>
                ) : error ?
                    (
                        <div>
                            <p>❌ {error === 'city not found' ? 'City not found. Please check spelling' : error}</p>
                        </div>
                    ) :
                    (
                        <p className="text-gray-500">
                            🔍 Search for a city to see weather
                        </p>
                    )
                }
            </div>
        </div>
    )
}

function getBgColor(weather) {
    if (!weather) return 'bg-white'

    const condition = weather.weather[0].main;
    switch (condition) {
        case 'Clear': return 'bg-amber-50';
        case 'Clouds': return 'bg-slate-100';
        case 'Rain': return 'bg-blue-50';
        case 'Snow': return 'bg-indigo-50';
        default: return 'bg-white';
    }
}

export default App
