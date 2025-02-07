export default function Learn() {
    return (
        <div className="[perspective:1000px] [transform-style:preserve-3d]  w-full h-screen flex items-center justify-center">
            <div className="group w-[200px] h-[200px] bg-zinc-500 hover:bg-zinc-600 rounded-lg hover:[transform:rotateX(30deg)] transition-all duration-300">
                <div className="w-full h-full bg-inherit">
                    <h1 className="text-zinc-500 text-2xl font-bold group-hover:text-white transition-all duration-30   0">Hello There!</h1>
                </div>
            </div>
        </div>
    );
}
