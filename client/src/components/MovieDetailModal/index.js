import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPlus, FaCheck, FaThumbsUp, FaTimesCircle, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { addToMyList, removeFromMyList } from '../../services/movieService';

const MovieDetailModal = ({ movie, isOpen, onClose, isInMyList, onToggleMyList }) => {
  const modalRef = useRef();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close modal with escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Handle my list toggle
  const handleMyListToggle = async () => {
    try {
      if (isInMyList) {
        await removeFromMyList(movie.id);
      } else {
        await addToMyList(movie.id);
      }
      
      if (onToggleMyList) {
        onToggleMyList(movie.id);
      }
    } catch (error) {
      console.error('Erreur lors de la modification de ma liste:', error);
    }
  };

  if (!isOpen || !movie) return null;

  return (
    <ModalOverlay>
      <ModalContainer ref={modalRef}>
        <CloseButton onClick={onClose}>
          <FaTimesCircle />
        </CloseButton>
        
        <HeroSection>
          <HeroBackdrop 
            style={{ backgroundImage: `url(${movie.backdropUrl || '/placeholder-backdrop.jpg'})` }}
          >
            <HeroGradient />
            <HeroContent>
              <MovieTitle>{movie.title}</MovieTitle>
              
              <ButtonGroup>
                <PrimaryButton>
                  <FaPlay />
                  <span>Lecture</span>
                </PrimaryButton>
                
                <SecondaryButton onClick={handleMyListToggle}>
                  {isInMyList ? <FaCheck /> : <FaPlus />}
                  <span>{isInMyList ? 'Dans ma liste' : 'Ma liste'}</span>
                </SecondaryButton>
                
                <IconButton>
                  <FaThumbsUp />
                </IconButton>
                
                <IconButton>
                  <FaVolumeUp />
                </IconButton>
              </ButtonGroup>
            </HeroContent>
          </HeroBackdrop>
        </HeroSection>
        
        <ContentSection>
          <MainInfo>
            <MetaInfo>
              <Relevance>Recommandé à 97%</Relevance>
              <Year>{movie.releaseYear || '2023'}</Year>
              <Duration>{movie.duration || '1h 30m'}</Duration>
              <QualityTag>HD</QualityTag>
            </MetaInfo>
            
            <Synopsis>{movie.description || 'Aucune description disponible pour ce titre.'}</Synopsis>
          </MainInfo>
          
          <DetailInfo>
            <DetailColumn>
              <DetailLabel>Distribution:</DetailLabel>
              <DetailText>{movie.cast?.join(', ') || 'Information non disponible'}</DetailText>
            </DetailColumn>
            
            <DetailColumn>
              <DetailLabel>Genres:</DetailLabel>
              <DetailText>{movie.genres?.join(', ') || 'Information non disponible'}</DetailText>
            </DetailColumn>
            
            <DetailColumn>
              <DetailLabel>Ce film est:</DetailLabel>
              <DetailText>Intense, Dramatique, Suspense</DetailText>
            </DetailColumn>
          </DetailInfo>
        </ContentSection>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 850px;
  max-height: 90vh;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.light};
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

const HeroBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
`;

const HeroGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, ${({ theme }) => theme.colors.darkGrey}, transparent);
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  z-index: 2;
`;

const MovieTitle = styled.h1`
  color: ${({ theme }) => theme.colors.light};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.8rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: bold;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: bold;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.light};
  border-radius: 50%;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ContentSection = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const MainInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Relevance = styled.span`
  color: ${({ theme }) => theme.colors.success};
  font-weight: bold;
`;

const Year = styled.span`
  color: ${({ theme }) => theme.colors.light};
`;

const Duration = styled.span`
  color: ${({ theme }) => theme.colors.light};
`;

const QualityTag = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.lightGrey};
  padding: 1px ${({ theme }) => theme.spacing.xs};
  font-size: 12px;
`;

const Synopsis = styled.p`
  color: ${({ theme }) => theme.colors.light};
  font-size: 16px;
  line-height: 1.5;
`;

const DetailInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const DetailColumn = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DetailLabel = styled.div`
  color: ${({ theme }) => theme.colors.lightGrey};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  font-size: 14px;
`;

const DetailText = styled.div`
  color: ${({ theme }) => theme.colors.light};
  font-size: 14px;
`;

export default MovieDetailModal;