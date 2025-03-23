import { useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPlus, FaCheck, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import { addToMyList, removeFromMyList } from '../../services/movieService';

const MovieCard = ({ movie, isInMyList, onToggleMyList, onShowDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Formatter les genres en texte
  const genresText = movie.genres && movie.genres.slice(0, 3).join(' • ');
  
  // Gérer l'ajout/suppression de la liste
  const handleMyListToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  
  // Gérer l'affichage des détails
  const handleShowDetails = (e) => {
    e.preventDefault();
    if (onShowDetails) {
      onShowDetails(movie);
    }
  };

  return (
    <CardContainer 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleShowDetails}
    >
      <CardImage src={movie.posterUrl || '/placeholder-poster.jpg'} alt={movie.title} />
      
      {isHovered && (
        <CardOverlay>
          <OverlayImage src={movie.backdropUrl || movie.posterUrl || '/placeholder-backdrop.jpg'} alt={movie.title} />
          
          <OverlayContent>
            <CardTitle>{movie.title}</CardTitle>
            
            <ButtonGroup>
              <ActionButton aria-label="Lecture">
                <FaPlay />
              </ActionButton>
              
              <ActionButton 
                onClick={handleMyListToggle} 
                aria-label={isInMyList ? "Retirer de ma liste" : "Ajouter à ma liste"}
                disabled={loading}
              >
                {isInMyList ? <FaCheck /> : <FaPlus />}
              </ActionButton>
              
              <ActionButton aria-label="J'aime">
                <FaThumbsUp />
              </ActionButton>
              
              <MoreButton aria-label="Plus d'informations" onClick={handleShowDetails}>
                <FaChevronDown />
              </MoreButton>
            </ButtonGroup>
            
            <MetaInfo>
              <RatingBadge>{movie.rating || 'TV-MA'}</RatingBadge>
              <Duration>{movie.duration || '1h 30m'}</Duration>
              <QualityTag>HD</QualityTag>
            </MetaInfo>
            
            {genresText && <GenreList>{genresText}</GenreList>}
          </OverlayContent>
        </CardOverlay>
      )}
    </CardContainer>
  );
};

// Styled components
const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%; /* Aspect ratio 2:3 for posters */
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: scale(1.05);
    z-index: 5;
  }
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(0,0,0,0.1) 0%, 
    rgba(0,0,0,0.8) 80%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  object-fit: cover;
`;

const OverlayContent = styled.div`
  position: relative;
  z-index: 2;
  padding: ${({ theme }) => theme.spacing.xs};
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.light};
  font-size: 16px;
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

const MoreButton = styled(ActionButton)`
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.mediumGrey};
  color: ${({ theme }) => theme.colors.light};
  border: 2px solid ${({ theme }) => theme.colors.lightGrey};
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  font-size: 12px;
`;

const RatingBadge = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.lightGrey};
  padding: 0 ${({ theme }) => theme.spacing.xxs};
  margin-right: ${({ theme }) => theme.spacing.xs};
  font-size: 11px;
`;

const Duration = styled.span`
  color: ${({ theme }) => theme.colors.light};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const QualityTag = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.lightGrey};
  padding: 0 ${({ theme }) => theme.spacing.xxs};
  font-size: 11px;
`;

const GenreList = styled.div`
  color: ${({ theme }) => theme.colors.light};
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default MovieCard;