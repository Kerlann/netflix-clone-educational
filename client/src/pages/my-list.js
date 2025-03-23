import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import { getMyList } from '../services/movieService';
import { MdOutlinePlaylistAddCheck } from 'react-icons/md';

export default function MyListPage() {
  const [myList, setMyList] = useState([]);
  const [myListIds, setMyListIds] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch my list on component mount
  useEffect(() => {
    const fetchMyList = async () => {
      setLoading(true);
      try {
        const myListData = await getMyList();
        setMyList(myListData);
        setMyListIds(myListData.map(movie => movie.id));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching my list:', err);
        setError('Erreur lors du chargement de votre liste. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchMyList();
  }, []);

  // Handle toggling a movie in My List
  const handleToggleMyList = (movieId) => {
    // Remove from my list
    setMyListIds(prev => prev.filter(id => id !== movieId));
    setMyList(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Open modal with selected movie details
  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <Head>
        <title>Ma Liste - Netflix Clone</title>
        <meta name="description" content="Vos films et séries enregistrés - Netflix Clone" />
      </Head>

      <PageContainer>
        <PageHeader>
          <Title>Ma Liste</Title>
        </PageHeader>

        <ContentContainer>
          {loading ? (
            <LoadingMessage>Chargement...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : myList.length > 0 ? (
            <MovieGrid>
              {myList.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isInMyList={true}
                  onToggleMyList={handleToggleMyList}
                  onShowDetails={handleShowDetails}
                  layout="grid"
                />
              ))}
            </MovieGrid>
          ) : (
            <EmptyListContainer>
              <EmptyListIcon />
              <EmptyListMessage>Votre liste est vide</EmptyListMessage>
              <EmptyListDescription>
                Ajoutez des films et séries à votre liste pour les retrouver facilement plus tard.
              </EmptyListDescription>
            </EmptyListContainer>
          )}
        </ContentContainer>
      </PageContainer>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isInMyList={myListIds.includes(selectedMovie.id)}
          onToggleMyList={handleToggleMyList}
        />
      )}
    </Layout>
  );
}

// Styled components
const PageContainer = styled.div`
  padding: 6rem 0 2rem 0;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  padding: 0 4rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.light};
`;

const ContentContainer = styled.div`
  padding: 0 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
`;

const LoadingMessage = styled.div`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.2rem;
  text-align: center;
  padding: 3rem 0;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  text-align: center;
  padding: 3rem 0;
`;

const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
  text-align: center;
`;

const EmptyListIcon = styled(MdOutlinePlaylistAddCheck)`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 1.5rem;
`;

const EmptyListMessage = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: 1rem;
`;

const EmptyListDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray};
  max-width: 600px;
`;
