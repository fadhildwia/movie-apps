import { useQuery, UseQueryOptions } from 'react-query';
import api from '../services/api';
import { FetchMovieDetailResponse } from '../types';

const fetchGetDetailMovie = async ({
  id
}: {
  id: string;
}) => {
  const { data } = await api.get<FetchMovieDetailResponse>(
    `?i=${id}&apikey=${import.meta.env.VITE_APP_OMDB_KEY}`,
  );
  return data;
};

const useGetDetailMovie = ({
  id,
  options,
}: {
  id: string;
  options?: UseQueryOptions<FetchMovieDetailResponse>;
}) => {
  return useQuery({
    queryKey: ['DetailMovie', id],
    queryFn: () => fetchGetDetailMovie({ id }),
    ...options,
  });
};

export default useGetDetailMovie;
