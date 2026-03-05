export default function SearchesDisplay({ searches, onSelect }) {
    return (
        <div className="w-full max-w-4xl overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-min">
                {searches && searches.map((item, index) => {
                    return (
                        <button key={index} onClick={() => onSelect(item)}
                            className="flex-shrink-0 px-6 py-3 bg-gray-100 hover:bg-gray-200 
                                        text-gray-700 font-semibold rounded-lg
                                        transition-colors duration-200 shadow-sm hover:shadow
                                        whitespace-nowrap"
                        >
                            <p>
                                {item}
                            </p>
                        </button>
                    )
                })
                }
            </div>
        </div>
    )
}