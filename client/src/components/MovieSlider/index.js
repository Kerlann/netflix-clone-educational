import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MovieCard from '../MovieCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const MovieSlider = ({ title, movies, myListIds = [], onToggleMyList, onShowDetails }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Configure navigation when swiper instance is available
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
      
      // Check initial navigation state
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
      
      // Add listeners for navigation state changes
      swiperInstance.on('slideChange', () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });
    }
  }, [swiperInstance]);

  // Calculate number of slides per view based on screen size
  const getBreakpoints = () => {
    return {
      320: { slidesPerView: 2, spaceBetween: 10 },
      480: { slidesPerView: 3, spaceBetween: 15 },
      768: { slidesPerView: 4, spaceBetween: 15 },
      1024: { slidesPerView: 5, spaceBetween: 20 },
      1280: { slidesPerView: 6, spaceBetween: 20 }
    };
  };

  return (
    <SliderContainer>
      <TitleRow>
        <SliderTitle>{title}</SliderTitle>
      </TitleRow>
      
      <SliderWrapper>
        <NavButton 
          ref={prevRef} 
          direction="left" 
          disabled={isBeginning}
          aria-label="Précédent"
        >
          <FaChevronLeft />
        </NavButton>
        
        <Swiper
          modules={[Navigation]}
          onSwiper={setSwiperInstance}
          slidesPerView="auto"
          spaceBetween={10}
          breakpoints={getBreakpoints()}
          navigation={{
            prevEl: prevRef?.current,
            nextEl: nextRef?.current,
            enabled: true
          }}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard 
                movie={movie}
                isInMyList={myListIds.includes(movie.id)}
                onToggleMyList={onToggleMyList}
                onShowDetails={onShowDetails}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <NavButton 
          ref={nextRef} 
          direction="right" 
          disabled={isEnd}
          aria-label="Suivant"
        >
          <FaChevronRight />
        </NavButton>
      </SliderWrapper>
    </SliderContainer>
  );
};

// Styled components
const SliderContainer = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const SliderTitle = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.5rem;
  margin: 0;
`;

const SliderWrapper = styled.div`
  position: relative;
  padding: 0 ${({ theme }) => theme.spacing.md};

  .swiper {
    overflow: visible;
  }

  .swiper-slide {
    width: auto;
    height: auto;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ direction }) => direction === 'left' ? 'left: 0;' : 'right: 0;'}
  width: 50px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  opacity: 0;
  
  ${SliderWrapper}:hover & {
    opacity: ${({ disabled }) => disabled ? 0.3 : 1};
  }
  
  &:disabled {
    cursor: default;
    opacity: 0;
  }
  
  svg {
    font-size: 20px;
  }
`;

export default MovieSlider;