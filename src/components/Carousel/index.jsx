import { useEffect, useRef } from 'react';
import { CarouselItem } from '../CarouselItem';

export const Carousel = () => {
    const ref = useRef(null)

    useEffect(() => {
        ref.current.scrollLeft = 0;

        const handleScrollMax = () => {
            if ( window.innerWidth >= 1280 ) return 264 * 4;
            if ( window.innerWidth >= 1024 ) return 264 * 5;
            if ( window.innerWidth >= 768 ) return 264 * 6;
            return 264 * 7;
        }

        setInterval(() => {
            if (ref.current) {
                if (ref.current.scrollLeft >= handleScrollMax()) {
                    ref.current.scrollLeft = 0;
                } else {
                    ref.current.scrollLeft += 264;
                }
            };
        }, 2000)
    }, [])

    return (
        <div>
            <div className="w-[264px] md:w-[528px] lg:w-[792px] xl:w-[1056px] mx-auto rounded shadow-xl">
                <div ref={ref} className='overflow-x-auto rounded scroll-smooth scrollbar-hide'>
                        <div className='flex'>
                            <CarouselItem image={'goblin.jpg'} />
                            <CarouselItem image={'chest.png'} />
                            <CarouselItem image={'fire.gif'} />
                            <CarouselItem image={'sign.png'} />
                            <CarouselItem image={'goblin.jpg'} />
                            <CarouselItem image={'chest.png'} />
                            <CarouselItem image={'fire.gif'} />
                            <CarouselItem image={'sign.png'} />
                        </div>
                </div>
            </div>
        </div>
    )
}