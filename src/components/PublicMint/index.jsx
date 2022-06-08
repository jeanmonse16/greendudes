export const PublicMint = () => {
    return (
        <>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center uppercase">Public Minting Open</h2>
            <p className="text-center text-lg md:text-xl">No waitlist needed. Public minting is now open</p>
            <div className="flex flex-row justify-between px-5">
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold">Supply</p>
                    <span>10000</span>
                </div>                   
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold">Price Per Mint</p>
                    <span>8 MATIC</span>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold">Max</p>
                    <span>10</span>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 items-center bg-gray-300 rounded-full">
                    <button className="w-8 h-8 bg-black rounded-full border border-white text-white text-xl shadow-md transition-transform hover:scale-105">
                        -
                    </button>
                    <span className="font-bold">
                        10
                    </span>
                    <button className="w-8 h-8 bg-black rounded-full border border-white text-white text-xl shadow-md transition-transform hover:scale-105">
                        +
                    </button>
                </div>
                <button className="bg-black px-4 py-1 rounded-full border border-white text-white shadow-md transition-transform hover:scale-105">
                    Set Max
                </button>
            </div>
            <div className="flex flex-row justify-between px-5">
                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">Total</span>
                </div>                   
                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">8 MATIC</span>
                </div>
            </div>
            <button className="self-center bg-black px-4 py-1 rounded-full border border-white text-white shadow-md transition-transform hover:scale-105">
                Mint your NFT
            </button>
        </>
    )
}