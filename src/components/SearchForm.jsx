import { useState } from 'react';

export default function SearchForm({ onSubmit }) {
    const [city, setCity] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(city);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2">
                <label
                    htmlFor="searchBar"
                    className="text-gray-700 font-semibold text-lg whitespace-nowrap"
                >
                    City:
                </label>
                <input
                    type="text"
                    id="searchBar"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="e.g., Jakarta, Tokyo, London"
                    className="flex-1 w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                             focus:border-blue-400 focus:outline-none
                             text-gray-700 placeholder-gray-400
                             transition-colors duration-200"
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white font-semibold
                             rounded-lg hover:bg-blue-600 
                             transition-colors duration-200
                             shadow-md hover:shadow-lg
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!city.trim()}
                >
                    Search
                </button>
            </div>
        </form>
    )
}