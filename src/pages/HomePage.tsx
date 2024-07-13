import React, { useState } from 'react'
import useGetMovie from '../hooks/useGetMovie';
import Loader from '../components/Loader';

const HomePage: React.FC = () => {
  const [page] = useState<number>(1)

  const { data: movieList, isLoading: loadingMovie } = useGetMovie({ search: 'batman', page });

  console.log(movieList)
  return (
    <>
      <Loader enabled={loadingMovie} />
      <div>HomePage</div>
    </>
  )
}

export default HomePage