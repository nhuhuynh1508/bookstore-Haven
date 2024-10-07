import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

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
                    interval: 3000,
                }}
            >
            <SplideSlide>
                <img src="/assets/bookstore_1.jpg" alt="Slide 1" className="w-full h-[30vh] md:h-[60vh] object-cover" />
            </SplideSlide>
            <SplideSlide>
                <img src="/assets/bookstore_2.jpg" alt="Slide 2" className="w-full h-[30vh] md:h-[60vh] object-cover" />
            </SplideSlide>
            <SplideSlide>
                <img src="/assets/bookstore_3.jpg" alt="Slide 3" className="w-full h-[30vh] md:h-[60vh] object-cover" />
            </SplideSlide>
            </Splide>
        </section>
    )
}