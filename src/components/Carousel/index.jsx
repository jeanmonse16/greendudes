import { useEffect, useRef } from 'react';
import { CarouselItem } from '../CarouselItem';
import Goblin from '../../assets/images/goblin.jpg';
import Chest from '../../assets/images/chest.png';
import Sign from '../../assets/images/sign.png';
import Fire from '../../assets/images/fire.gif';

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
            if (ref.current.scrollLeft >= handleScrollMax()) {
                ref.current.scrollLeft = 0;
            } else {
                ref.current.scrollLeft += 264;
            };
        }, 2000)
    }, [])

    return (
        <div>
            <div className="w-[264px] md:w-[528px] lg:w-[792px] xl:w-[1056px] mx-auto rounded shadow-xl">
                <div ref={ref} className='overflow-x-auto rounded scroll-smooth scrollbar-hide'>
                        <div className='flex'>
                            <CarouselItem image={Goblin} />
                            <CarouselItem image={Chest} />
                            <CarouselItem image={Fire} />
                            <CarouselItem image={Sign} />
                            <CarouselItem image={Goblin} />
                            <CarouselItem image={Chest} />
                            <CarouselItem image={Fire} />
                            <CarouselItem image={Sign} />
                        </div>
                </div>
            </div>
        </div>
    )
}