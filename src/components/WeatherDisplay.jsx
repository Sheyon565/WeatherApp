export default function WeatherDisplay({ weather, bgColor }) {
    return (
        <div className={`${bgColor} rounded-xl shadow-lg p-6 max-w-md w-full`}>
            <h1 className="font-bold text-2xl mb-4 border-b pb-2">
                {weather.name}
            </h1>
            <div className="flex gap-5">
                <div className="flex-shrink-0">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                        alt={weather.weather[0].description}
                        className="bg-teal-500 rounded-full w-24 h-24"
                    />
                </div>

                <WeatherDetails weather={weather} />
            </div>
        </div>
    )
}

function WeatherDetails({ weather }) {
    return (
        <div className="space-y-3">
            {/* Temperature section */}
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{weather.main.temp}°C</span>
                <span className="text-gray-600">Feels like {weather.main.feels_like}°C</span>
            </div>

            {/* Condition with better styling */}
            <p className="text-gray-600 capitalize text-lg">
                {weather.weather[0].description}
            </p>

            {/* Details grid - 2 columns */}
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div>💧 Humidity: {weather.main.humidity}%</div>
                <div>💨 Wind: {weather.wind.speed} m/s</div>
                <div>🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>
                <div>🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>
            </div>

            {/* Coordinates - subtle */}
            <div className="text-xs text-gray-400 border-t pt-2">
                📍 {weather.coord.lon.toFixed(2)}, {weather.coord.lat.toFixed(2)}
            </div>
        </div>
    )
}