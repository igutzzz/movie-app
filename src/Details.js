import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiKey from "./key";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useParams } from "react-router-dom";

//Styled Components

const GlobalStyle = createGlobalStyle`
    html {
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,700;1,200&display=swap');
        font-family: 'Poppins', sans-serif;
    }
`;

const BgImage = styled.img`
    width: 100%;
    image-fit: cover;   
    height: auto;
    position: absolute;
    z-index: -1;
    filter: blur(2px);
`

const Titulo = styled.h1`
    text-align: center;
    margin: 0;
    padding: 1.5rem 0;
`;

const MovieDetails = styled.div`
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    width: 75vw;
`;

const MovieBanner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20rem;
`;

const Poster = styled.img`
    width: 75%;
    height: auto;
    border-radius: 10px;
`

const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 50%;
    margin-left: 2rem;
`;

const Home = styled.h4`
    color: #fff;
`

function Details() {
    
    const {id} = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`)
        .then(response => response.json())
        .then(data => setMovie(data))
    }, [id]);

    const DetailsPage = styled.div`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,700;1,200&display=swap');
        font-family: 'Poppins', sans-serif;
        color: #fff;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `

    return(
        <DetailsPage>
            <GlobalStyle />
            <BgImage src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
            <Link to="/" style={{textDecoration: 'none'}}><Home>Voltar para a Página Inicial</Home></Link>
            <MovieDetails>
                <MovieBanner>
                <Titulo>{movie.title}</Titulo>
                    <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                </MovieBanner>
                <MovieInfo>
                    <h2>Sinopse</h2>
                    <p>{movie.overview}</p>
                    <h3>Data de Lançamento</h3>
                    <p>{movie.release_date}</p>
                    <p>Nota: {movie.vote_average} ({movie.vote_count})</p>
                </MovieInfo>
            </MovieDetails>
        </DetailsPage>
    )
}

export default Details;