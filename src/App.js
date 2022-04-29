import {useState} from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiKey from './key';
import styled from 'styled-components';

const Titulo = styled.h1`
  text-align: center;
`

const MovieItem = styled.li`	
  text-align: center;
  padding: 0;
  margin: 1rem 0;
  font-size: .9rem;
`

const MoviePoster = styled.img`
  width: 60%;
  height: auto;
  border-radius: 10px;
  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 0.9997;
    cursor: pointer;
    transform: scale(1.05);
  }
`

const MovieList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 2rem;
`
const BottomNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`

const PageButton = styled.button`
  background-color: #1c1c1c;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }

`

function App() {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${pages}`)
    .then(response => response.json())
    .then(response => {
      let popularMovies = response.results;
      setMovies(popularMovies);
    })
  }, [pages]);

  const nextPage = () => {
    setPages(pages + 1);
    window.scrollTo = (0,0);
  }

  const prevPage = () => {
    setPages(pages === 1? pages: pages - 1);
    window.scrollTo = ({top: 0, behavior: 'smooth'});
  }

  return (
    <div className="App">
      <Titulo>Filmes Populares</Titulo>
      <MovieList>
        {movies.map(movie => (
          <MovieItem key={movie.id}>
            <Link to={`/details/${movie.id}`}><MoviePoster src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.title} /></Link>
            <h2>{movie.title}</h2>
          </MovieItem>
        ))}
      </MovieList>
      <BottomNavigation>
        <PageButton onClick={prevPage}>Página Anterior</PageButton>
        <p>Página {pages}</p>
        <PageButton onClick={nextPage}>Próxima Página</PageButton>
      </BottomNavigation>
    </div>
  );
}

export default App;
