import { useQuery, UseQueryOptions } from 'react-query';
import api from '../services/api';
import { FetchMoviesResponse } from '../types';

const fetchGetMovie = async ({
  search,
  page,
}: {
  search: string;
  page: number | string;
}) => {
  const { data } = await api.get<FetchMoviesResponse>(
    `?s=${search}&page=${page}&apikey=${import.meta.env.VITE_APP_OMDB_KEY}`,
  );
  return data;
};

const useGetMovie = ({
  search,
  page,
  options,
}: {
  search: string;
  page: number | string;
  options?: UseQueryOptions<FetchMoviesResponse>;
}) => {
  return useQuery({
    queryKey: ['Movie', search, page],
    queryFn: () => fetchGetMovie({ search, page }),
    ...options,
  });
};

export default useGetMovie;
