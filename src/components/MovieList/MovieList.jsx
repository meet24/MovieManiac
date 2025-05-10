import React, { useEffect, useState } from "react";

import "./MovieList.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([])
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_MOVIE_API}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched movies:", data);
            setMovies(data.results);
            setFilterMovies(data.results);
        } catch (error) {
            console.error("Fetching movies failed:", error);
        }
    };

    const handleFilter = rate => {
        if(rate === minRating) {
            setMinRating(0);
            setFilterMovies(movies);
        } else {
            setMinRating(rate);
            const filtered = movies.filter(movie => movie.vote_average >= rate);
            setFilterMovies(filtered);
        }
    }

    return (
        <section className='movie_list'>
            <header className='align_center movie_list_header'>
                <h2 className='align_center movie_list_heading'>
                    Popular{" "}
                    <img src={Fire} alt='fire emoji' className='navbar_emoji' />
                </h2>

                <div className='align_center movie_list_fs'>
                    <ul className='align_center movie_filter'>
                        <li className={minRating === 8 ? 'movie_filter_item active' : 'movie_filter_item' } onClick={() => handleFilter(8)}>8+ Star</li>
                        <li className={minRating === 7 ? 'movie_filter_item active' : 'movie_filter_item' } onClick={() => handleFilter(7)}>7+ Star</li>
                        <li className={minRating === 6 ? 'movie_filter_item active' : 'movie_filter_item' } onClick={() => handleFilter(6)}>6+ Star</li>
                    </ul>

                    <select name='' id='' className='movie_sorting'>
                        <option value=''>SortBy</option>
                        <option value=''>Date</option>
                        <option value=''>Rating</option>
                    </select>
                    <select name='' id='' className='movie_sorting'>
                        <option value=''>Ascending</option>
                        <option value=''>Descending</option>
                    </select>
                </div>
            </header>

            <div className='movie_cards'>
                {filterMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};

export default MovieList;