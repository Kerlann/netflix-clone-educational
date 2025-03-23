import styled from 'styled-components';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Hero = ({ featured, onPlayMovie, onShowDetails }) => {
  if (!featured) return null;

  return (
    <HeroContainer>
      <HeroBackdrop style={{ backgroundImage: `url(${featured.backdropUrl})` }}>
        <HeroGradient />
        
        <HeroContent>
          <MovieTitle>{featured.title}</MovieTitle>
          
          {featured.tagline && (
            <MovieTagline>{featured.tagline}</MovieTagline>
          )}
          
          <MovieDescription>
            {featured.description && featured.description.length > 200
              ? `${featured.description.substring(0, 200)}...`
              : featured.description}
          </MovieDescription>
          
          <ButtonGroup>
            <PlayButton onClick={() => onPlayMovie && onPlayMovie(featured)}>
              <FaPlay />
              <span>Lecture</span>
            </PlayButton>
            
            <InfoButton onClick={() => onShowDetails && onShowDetails(featured)}>
              <FaInfoCircle />
              <span>Plus d'infos</span>
            </InfoButton>
          </ButtonGroup>
        </HeroContent>
      </HeroBackdrop>
    </HeroContainer>
  );
};

// Styled components
const HeroContainer = styled.div`
  width: 100%;
  height: 80vh;
  max-height: 800px;
  min-height: 450px;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 60vh;
    min-height: 350px;
  }
`;

const HeroBackdrop = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
  position: relative;
`;

const HeroGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.8) 100%
  ),
  linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 60%
  );
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 20%;
  left: 5%;
  width: 45%;
  z-index: 10;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80%;
    bottom: 15%;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
    bottom: 10%;
  }
`;

const MovieTitle = styled.h1`
  color: ${({ theme }) => theme.colors.light};
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const MovieTagline = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: normal;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const MovieDescription = styled.p`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.75);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    width: 100%;
  }
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: rgba(109, 109, 110, 0.7);
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
  
  &:hover {
    background-color: rgba(109, 109, 110, 0.5);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    width: 100%;
  }
`;

export default Hero;