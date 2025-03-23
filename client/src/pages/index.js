import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { getTrending, getTopRated, getMovies, getMyList } from '../services/movieService';
import Hero from '../components/Hero';
import MovieSlider from '../components/MovieSlider';
import MovieDetailModal from '../components/MovieDetailModal';

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [myList, setMyList] = useState([]);
  const [myListIds, setMyListIds] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get movies from different categories
        const [trendingData, topRatedData, actionData, comedyData, docData, myListData] = await Promise.all([
          getTrending(),
          getTopRated(),
          getMovies('action'),
          getMovies('comedy'),
          getMovies('documentary'),
          getMyList()
        ]);

        setTrending(trendingData);
        setTopRated(topRatedData);
        setActionMovies(actionData);
        setComedyMovies(comedyData);
        setDocumentaries(docData);
        setMyList(myListData);
        
        // Extract IDs for the my list comparison
        setMyListIds(myListData.map(movie => movie.id));
        
        // Set a featured movie from trending
        if (trendingData.length > 0) {
          setFeaturedMovie(trendingData[0]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle toggling a movie in My List
  const handleToggleMyList = (movieId) => {
    if (myListIds.includes(movieId)) {
      // Remove from my list
      setMyListIds(prev => prev.filter(id => id !== movieId));
      setMyList(prev => prev.filter(movie => movie.id !== movieId));
    } else {
      // Add to my list
      setMyListIds(prev => [...prev, movieId]);
      
      // Find the movie in one of our lists and add it to myList
      const movieToAdd = 
        [...trending, ...topRated, ...actionMovies, ...comedyMovies, ...documentaries]
          .find(movie => movie.id === movieId);
      
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

  // Mock function for play button
  const handlePlayMovie = (movie) => {
    console.log('Playing movie:', movie.title);
    alert(`Lecture de "${movie.title}" (fonctionnalité simulée)`);
  };

  if (loading) {
    return <LoadingContainer>Chargement...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <>
      <Head>
        <title>Netflix Clone - Accueil</title>
        <meta name="description" content="Netflix Clone - Projet éducatif" />
      </Head>

      <PageContainer>
        {featuredMovie && (
          <Hero 
            featured={featuredMovie} 
            onPlayMovie={handlePlayMovie}
            onShowDetails={handleShowDetails}
          />
        )}

        <SlidersContainer>
          {myList.length > 0 && (
            <MovieSlider
              title="Ma liste"
              movies={myList}
              myListIds={myListIds}
              onToggleMyList={handleToggleMyList}
              onShowDetails={handleShowDetails}
            />
          )}

          <MovieSlider
            title="Tendances actuelles"
            movies={trending}
            myListIds={myListIds}
            onToggleMyList={handleToggleMyList}
            onShowDetails={handleShowDetails}
          />

          <MovieSlider
            title="Les mieux notés"
            movies={topRated}
            myListIds={myListIds}
            onToggleMyList={handleToggleMyList}
            onShowDetails={handleShowDetails}
          />

          <MovieSlider
            title="Action"
            movies={actionMovies}
            myListIds={myListIds}
            onToggleMyList={handleToggleMyList}
            onShowDetails={handleShowDetails}
          />

          <MovieSlider
            title="Comédies"
            movies={comedyMovies}
            myListIds={myListIds}
            onToggleMyList={handleToggleMyList}
            onShowDetails={handleShowDetails}
          />

          <MovieSlider
            title="Documentaires"
            movies={documentaries}
            myListIds={myListIds}
            onToggleMyList={handleToggleMyList}
            onShowDetails={handleShowDetails}
          />
        </SlidersContainer>
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
    </>
  );
}

// Styled components
const PageContainer = styled.div`
  width: 100%;
`;

const SlidersContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
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