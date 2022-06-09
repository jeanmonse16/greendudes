export const MintException = ({ title, description }) => {
    return (
        <div className="flex-1 gap-4 flex flex-col items-center justify-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center uppercase">{title}</h2>
            <p className="text-center text-lg md:text-xl">{description}</p>
        </div>
    )
}