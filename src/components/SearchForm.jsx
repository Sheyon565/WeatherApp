import { useState } from 'react';

export default function SearchForm({ onSubmit }) {
    const [city, setCity] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(city);
    }

    return (
        <form action=""
            onSubmit={handleSubmit}
            className="p-5 "
        >
            <label
                htmlFor="searchBar"
                className="mr-3 font-semibold"
            >
                Input You City:
            </label>
            <input
                type="text"
                name="searchBar"
                id="searchBar"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="border-2 rounded-md mr-3 py-2 px-1"
            />
            <button
                className="px-3 py-2 border-2 rounded-md text-white font-bold
                    bg-blue-500 hover:bg-blue-600"
            >
                Search
            </button>
        </form>
    )
}