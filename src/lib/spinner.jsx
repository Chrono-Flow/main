export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce"></div>
            </div>
        </div>
    )
}