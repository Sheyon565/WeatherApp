export default function Card({ children, bgColor }) {
    return (
        <div
            className={`${bgColor} rounded-xl shadow-lg p-6 max-w-md w-full`}
        >
            {children}
        </div>
    )
}