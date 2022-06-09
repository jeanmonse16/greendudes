export const CarouselItem = ({ image }) => {
    return (
        <img className="inline w-[264px]" src={`${__ASSETS_URL__}${image}`} />
    )
}