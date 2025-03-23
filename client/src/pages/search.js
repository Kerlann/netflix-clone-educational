import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Head from 'next/head';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import { searchMovies, getMyList } from '../services/movieService';
import { FaSearch } from 'react-icons/fa';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  
  const [query, setQuery] = useState(q || '');
  const [results, setResults] = useState([]);
  const [myList, setMyList] = useState([]);
  const [myListIds, setMyListIds] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch my list on component mount
  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const myListData = await getMyList();
        setMyList(myListData);
        setMyListIds(myListData.map(movie => movie.id));
      } catch (err) {
        console.error('Error fetching my list:', err);
      }
    };

    fetchMyList();
  }, []);

  // Handle search when query parameter changes
  useEffect(() => {
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, [q]);

  // Perform search
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(searchQuery);
      setResults(data);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Erreur lors de la recherche. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Handle toggling a movie in My List
  const handleToggleMyList = (movieId) => {
    if (myListIds.includes(movieId)) {
      // Remove from my list
      setMyListIds(prev => prev.filter(id => id !== movieId));
      setMyList(prev => prev.filter(movie => movie.id !== movieId));
    } else {
      // Add to my list
      setMyListIds(prev => [...prev, movieId]);
      
      // Find the movie in our results and add it to myList
      const movieToAdd = results.find(movie => movie.id === movieId);
      
      if (movieToAdd) {
        setMyList(prev => [...prev, movieToAdd]);
      }
    }
  };

  // Open modal with selected movie details
  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <Head>
        <title>Recherche - Netflix Clone</title>
        <meta name="description" content="Recherchez des films et séries - Netflix Clone" />
      </Head>

      <PageContainer>
        <SearchContainer>
          <SearchForm onSubmit={handleSubmit}>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Titres, personnes, genres"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchButton type="submit">Rechercher</SearchButton>
          </SearchForm>
        </SearchContainer>

        <ContentContainer>
          {loading ? (
            <LoadingMessage>Recherche en cours...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : results.length > 0 ? (
            <>
              <ResultsHeader>
                <ResultsCount>{results.length} résultats pour <strong>"{q}"</strong></ResultsCount>
              </ResultsHeader>
              <ResultsGrid>
                {results.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isInMyList={myListIds.includes(movie.id)}
                    onToggleMyList={handleToggleMyList}
                    onShowDetails={handleShowDetails}
                    layout="grid"
                  />
                ))}
              </ResultsGrid>
            </>
          ) : q ? (
            <NoResultsMessage>Aucun résultat trouvé pour "{q}"</NoResultsMessage>
          ) : (
            <InitialMessage>Recherchez vos films et séries préférés</InitialMessage>
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

const SearchContainer = styled.div`
  padding: 0 4rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const SearchForm = styled.form`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background-color: ${({ theme }) => theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.light};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.light};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ContentContainer = styled.div`
  padding: 0 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const ResultsHeader = styled.div`
  margin-bottom: 2rem;
`;

const ResultsCount = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.light};
`;

const ResultsGrid = styled.div`
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

const NoResultsMessage = styled.div`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.2rem;
  text-align: center;
  padding: 3rem 0;
`;

const InitialMessage = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.5rem;
  text-align: center;
  padding: 5rem 0;
`;
