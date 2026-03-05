export default function ForecastDisplay({ forecast }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">
                5-Day Forecast
            </h2>
            <ForecastDetails forecast={forecast} />
        </div>
    )
}

function ForecastDetails({ forecast }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-items-ceter" >
            {forecast && forecast.map((item, index) => {
                const day = new Date(item.dt * 1000).toLocaleDateString('en', { weekday: 'short' })
                return (
                    <div key={index}
                        className="flex flex-col justify-between p-4 gap-3 bg-white/50 rounded-lg rounded-xl shadow-md hover:shadow-xl transition-shadow items-center"
                    >
                        <p className="self-start">{day}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                            alt={item.weather[0].description}
                            className="bg-teal-500 rounded-full w-24 h-24"
                        />
                        <p className="text-lg font-semibold self-start">{item.main.temp} &deg;C</p>
                    </div>
                )
            })}
        </div>
    )
}