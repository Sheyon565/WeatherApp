export default function WeatherDisplay({ weather, bgColor }) {
    return (
        <div className={`${bgColor} rounded-2xl shadow-xl p-6 md:p-8 w-full transition-colors duration-300`}>
            <h1 className="font-bold text-3xl md:text-4xl mb-6 border-b-2 border-gray-200 pb-3">
                {weather.name}
            </h1>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex justify-center md:justify-start">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                        alt={weather.weather[0].description}
                        className="w-32 h-32 md:w-28 md:h-28 lg:w-32 lg:h-32 
                                 bg-teal-500 rounded-full p-2
                                 shadow-l"
                    />
                </div>

                <WeatherDetails weather={weather} />
            </div>
        </div>
    )
}

function WeatherDetails({ weather }) {
    return (
        <div className="flex-1 space-y-4">
            {/* Temperature - center on mobile, left on desktop */}
            <div className="text-center md:text-left">
                <span className="text-4xl md:text-5xl font-bold">{weather.main.temp}°C</span>
                <span className="text-gray-600 ml-2 text-lg">Feels like {weather.main.feels_like}°C</span>
            </div>

            {/* Condition */}
            <p className="text-gray-600 capitalize text-xl text-center md:text-left">
                {weather.weather[0].description}
            </p>

            {/* Details grid - responsive columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base bg-white/30 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">💧</span>
                    <span>Humidity: {weather.main.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">💨</span>
                    <span>Wind: {weather.wind.speed} m/s</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🌅</span>
                    <span>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🌇</span>
                    <span>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Coordinates */}
            <div className="text-sm text-gray-500 border-t border-gray-200 pt-3 text-center md:text-left">
                📍 {weather.coord.lon.toFixed(2)}°, {weather.coord.lat.toFixed(2)}°
            </div>
        </div>
    )
}