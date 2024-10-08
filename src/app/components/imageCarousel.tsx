import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export const ImageCarousel = () => {
    return (
        <section className='splide' aria-label='Image Carousel'>
            <Splide
                options={{
                    type: 'loop',
                    perPage: 1,
                    pagination: true,
                    arrows: true,
                    autoplay: true,
                    interval: 5000,
                }}
            >
                    <SplideSlide>
                        <img src="/assets/bookstore_1.jpg" alt="Slide 1" className="w-full h-[30vh] md:h-[60vh] object-cover" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src="/assets/bookstore_2.jpg" alt="Slide 2" className="w-full h-[30vh] md:h-[60vh] object-cover" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src="/assets/bookstore_3.jpg" alt="Slide 3" className="w-full h-[30vh] md:h-[60vh] object-cover blur-sm" />
                    </SplideSlide>
            </Splide>
        </section>
    )
}