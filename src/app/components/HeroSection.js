'use client'

import { Carousel } from 'primereact/carousel';

export function BannerCarousel() {
    const images = [
        { id: 1, src: '/images/banner/banner1.webp' },
        { id: 2, src: '/images/banner/banner2.webp' },
        { id: 3, src: '/images/banner/banner3.webp' },
    ];

    const imageTemplate = (item) => {
        return (
            <div className="w-full">
                <img
                    src={item.src}
                    alt="Banner"
                    className="w-full h-[90vh] md:h-[80vh] max-sm:h-[50vh] object-cover"
                    />
            </div>
        );
    };

    return (
        <div>
            <Carousel
                value={images}
                itemTemplate={imageTemplate}
                numVisible={1}
                numScroll={1}
                autoplayInterval={4000}
                circular
                showIndicators={true}
                showNavigators={false}
                className="custom-carousel"
            />
        </div>
    );
}
