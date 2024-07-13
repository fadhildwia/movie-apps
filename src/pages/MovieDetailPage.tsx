import React from 'react'
import useGetDetailMovie from '../hooks/useGetDetailMovie';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: detailMovie, isLoading: loadingDetailMovie } = useGetDetailMovie({ id: id as string, options: { enabled: !!id} });

  console.log(detailMovie)
  return (
    <>
      <Loader enabled={loadingDetailMovie} />
      <div>MovieDetailPage</div>
    </>
  )
}

export default MovieDetailPage