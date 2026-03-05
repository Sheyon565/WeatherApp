export default function ForecastDisplay({ forecast }) {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
                5-Day Forecast
            </h2>
            <ForecastDetails forecast={forecast} />
        </div>
    )
}

function ForecastDetails({ forecast }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast && forecast.map((item, index) => {
                const day = new Date(item.dt * 1000).toLocaleDateString('en', { weekday: 'short' })
                return (
                    <div key={index}
                        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md 
                                 hover:shadow-xl transition-all duration-300
                                 p-4 flex flex-col items-center
                                 border border-gray-100"
                    >
                        <p className="font-semibold text-gray-700 mb-2">{day}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                            className="w-16 h-16 md:w-20 md:h-20 mb-2"
                        />
                        <p className="text-xl font-bold text-gray-800">
                            {Math.round(item.main.temp)}°C
                        </p>
                        <p className="text-xs text-gray-500 capitalize mt-1">
                            {item.weather[0].description}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}