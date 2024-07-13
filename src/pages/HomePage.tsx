import React, { useState } from 'react'
import useGetMovie from '../hooks/useGetMovie';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import { calculatePrice } from '../utils/calculatePrice';

const HomePage: React.FC = () => {
  const [page] = useState<number>(1)

  const { data: movieList, isLoading: loadingMovie } = useGetMovie({ search: 'batman', page });

  console.log(movieList)
  return (
    <>
      <Loader enabled={loadingMovie} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {movieList?.Response === 'True' && !loadingMovie ? (
          movieList.Search.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={{ ...movie, Price: calculatePrice(movie.Year) }}
            />
          ))
        ) : (
          <div className="text-center mt-4 text-black">No movies found for "test"</div>
        )}
      </div>
    </>
  )
}

export default HomePage