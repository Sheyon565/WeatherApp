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
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6 md:py-5 max-w-6xl">
                {/* Remove md:p-10 and min-h-screen from this div */}
                <div className="flex items-center flex-col gap-6 w-full">
                    <SearchForm onSubmit={setSubmitedCity} />

                    {loading && (
                        <div className="flex items-center justify-center p-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <p className="ml-2 text-gray-600">
                                Fetching Weather...
                            </p>
                        </div>
                    )}
                    {weather && !error ? (
                        <div className="w-full max-w-4xl space-y-6">
                            <WeatherDisplay weather={weather} bgColor={getBgColor(weather)} />
                            <ForecastDisplay forecast={forecast} />
                        </div>
                    ) : error ?
                        (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                <p className="text-red-600">❌ {error === 'city not found' ? 'City not found. Please check spelling' : error}</p>
                            </div>
                        ) :
                        (
                            <div className="text-center py-12">
                                <p className="text-gray-400 text-lg">
                                    🔍 Search for a city to see weather
                                </p>
                            </div>
                        )
                    }
                </div>
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
