import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MovieDetail from './MovieDetail';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${searchTerm ? `search/movie?query=${searchTerm}` : 'discover/movie?sort_by=popularity.desc'}&api_key=${API_KEY}&page=${currentPage}`)
      .then(response => response.json())
      .then(data => setMovies(data.results));
  }, [currentPage, searchTerm]);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={
            <div className="bg-gray-100 min-h-screen p-5">
              <div className="container mx-auto">
                <input type="text" value={searchTerm} onChange={handleSearch} className="w-full mb-4 p-2 rounded border border-gray-300" placeholder="Search for a movie..." />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {movies.map(movie => (
                    <Link to={`/movie/${movie.id}`} className="bg-white rounded-lg overflow-hidden shadow-lg" key={movie.id}>
                      <img src={IMG_PATH + movie.poster_path} alt={movie.title} className="w-full h-64 object-cover" />
                      <div className="p-6">
                        <div className='flex'>
                          <h2 className="font-bold text-xl mb-2">{movie.title}</h2>
                        </div>
                        <p className={`pt-2 text-lg font-bold ${movie.vote_average > 8 ? 'text-green-500' : movie.vote_average >= 5 ? 'text-orange-500' : 'text-red-500'}`}>{movie.vote_average}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <button onClick={prevPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Previous</button>
                  <button onClick={nextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
                </div>
              </div>
            </div>
          } />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;