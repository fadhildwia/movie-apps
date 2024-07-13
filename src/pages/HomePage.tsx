import React, { useState } from 'react'
import useGetMovie from '../hooks/useGetMovie';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import { calculatePrice } from '../utils/calculatePrice';
import Pagination from '../components/Pagination';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || 'batman';

  const [page, setPage] = useState<number>(1)

  const { data: movieList, isLoading: loadingMovie, isRefetching } = useGetMovie({ search: searchQuery, page });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Loader enabled={loadingMovie} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {movieList?.Response === 'True' && !loadingMovie && !isRefetching ? (
          movieList.Search.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={{ ...movie, Price: calculatePrice(movie.Year) }}
            />
          ))
        ) : null}
      </div>
      {movieList?.Response === 'True' && !loadingMovie && !isRefetching && (
        <div className='flex items-center justify-center my-5'>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(Number(movieList.totalResults) / 10)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      
    </>
  )
}

export default HomePage