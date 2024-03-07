import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}${id}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => setMovie(data));
    }, [id]);

    return movie ? (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
            <img className="w-full md:w-1/2 lg:w-1/3 object-cover rounded-lg shadow-md mb-4 md:mb-0 md:mr-4" src={IMG_PATH + movie.poster_path} alt={movie.title} />
            <div>
                <h2 className="mt-6 text-3xl font-semibold text-gray-700">{movie.title}</h2>
                <h3 className='mt-6 text-lg font-bolb'>Overview</h3>
                <p className="text-lg text-gray-600">{movie.overview}</p>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-2xl text-gray-500">Loading...</p>
        </div>
    );
}

export default MovieDetail;