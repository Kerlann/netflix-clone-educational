import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { FaPlay, FaPlus, FaCheck, FaThumbsUp, FaArrowLeft } from 'react-icons/fa';
import { getMovieDetails, getMyList, addToMyList, removeFromMyList } from '../../services/movieService';

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [movie, setMovie] = useState(null);
  const [isInMyList, setIsInMyList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details and check if in my list
  useEffect(() => {
    if (!id) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieData, myListData] = await Promise.all([
          getMovieDetails(id),
          getMyList()
        ]);
        
        setMovie(movieData);
        
        // Check if movie is in my list
        const myListIds = myListData.map(item => item.id);
        setIsInMyList(myListIds.includes(id));
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Erreur lors du chargement des données du film. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle toggling movie in my list
  const handleToggleMyList = async () => {
    try {
      if (isInMyList) {
        await removeFromMyList(id);
      } else {
        await addToMyList(id);
      }
      setIsInMyList(!isInMyList);
    } catch (error) {
      console.error('Error toggling my list:', error);
    }
  };

  // Handle back button
  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return <LoadingContainer>Chargement...</LoadingContainer>;
  }

  if (error || !movie) {
    return <ErrorContainer>{error || 'Film introuvable'}</ErrorContainer>;
  }

  return (
    <>
      <Head>
        <title>{movie.title} | Netflix Clone</title>
        <meta name="description" content={movie.description} />
      </Head>

      <PageContainer>
        <BackButton onClick={handleGoBack}>
          <FaArrowLeft />
          <span>Retour</span>
        </BackButton>
        
        <HeroSection>
          <ImageContainer>
            <BackdropImage 
              src={movie.backdropUrl || '/placeholder-backdrop.jpg'} 
              alt={movie.title} 
            />
            <Gradient />
          </ImageContainer>
          
          <HeroContent>
            <MovieTitle>{movie.title}</MovieTitle>
            {movie.tagline && <MovieTagline>{movie.tagline}</MovieTagline>}
            
            <MetaInfo>
              <Year>{movie.releaseYear || '2023'}</Year>
              <Rating>{movie.rating || 'TV-MA'}</Rating>
              <Duration>{movie.duration || '1h 30m'}</Duration>
              <Quality>HD</Quality>
            </MetaInfo>
            
            <ButtonGroup>
              <PlayButton>
                <FaPlay />
                <span>Lecture</span>
              </PlayButton>
              
              <MyListButton onClick={handleToggleMyList}>
                {isInMyList ? <FaCheck /> : <FaPlus />}
                <span>{isInMyList ? 'Dans ma liste' : 'Ma liste'}</span>
              </MyListButton>
              
              <LikeButton>
                <FaThumbsUp />
              </LikeButton>
            </ButtonGroup>
          </HeroContent>
        </HeroSection>
        
        <ContentSection>
          <MainInfo>
            <Synopsis>{movie.description}</Synopsis>
          </MainInfo>
          
          <DetailGrid>
            <DetailColumn>
              <DetailLabel>Distribution:</DetailLabel>
              <DetailText>{movie.cast?.join(', ') || 'Information non disponible'}</DetailText>
            </DetailColumn>
            
            <DetailColumn>
              <DetailLabel>Genres:</DetailLabel>
              <DetailText>{movie.genres?.join(', ') || 'Information non disponible'}</DetailText>
            </DetailColumn>
            
            <DetailColumn>
              <DetailLabel>Réalisateur:</DetailLabel>
              <DetailText>{movie.director || 'Information non disponible'}</DetailText>
            </DetailColumn>
          </DetailGrid>
        </ContentSection>
      </PageContainer>
    </>
  );
}

// Styled components
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.5rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const BackButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const HeroSection = styled.div`
  position: relative;
  height: 70vh;
  min-height: 500px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 50vh;
    min-height: 400px;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    ${({ theme }) => theme.colors.dark} 100%
  );
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: ${({ theme }) => theme.spacing.xl};
  width: 60%;
  z-index: 10;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80%;
    left: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
    left: ${({ theme }) => theme.spacing.md};
  }
`;

const MovieTitle = styled.h1`
  color: ${({ theme }) => theme.colors.light};
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  > * {
    margin-right: ${({ theme }) => theme.spacing.md};
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Year = styled.span`
  color: ${({ theme }) => theme.colors.light};
`;

const Rating = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.lightGrey};
  padding: 2px ${({ theme }) => theme.spacing.xs};
  font-size: 14px;
`;

const Duration = styled.span`
  color: ${({ theme }) => theme.colors.light};
`;

const Quality = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.lightGrey};
  padding: 2px ${({ theme }) => theme.spacing.xs};
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: bold;
  cursor: pointer;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const MyListButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: bold;
  cursor: pointer;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const LikeButton = styled.button`
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
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ContentSection = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const MainInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Synopsis = styled.p`
  color: ${({ theme }) => theme.colors.light};
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DetailColumn = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DetailLabel = styled.div`
  color: ${({ theme }) => theme.colors.lightGrey};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 14px;
`;

const DetailText = styled.div`
  color: ${({ theme }) => theme.colors.light};
`;
