interface MovieInterface {
  imdbID: string;
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
}

export interface FetchMoviesResponse {
  Search: MovieInterface[];
  totalResults: string;
  Response: string;
}

interface RatingInterface {
  Source: string;
  Value: string;
}

export interface FetchMovieDetailResponse extends MovieInterface {
  Plot: string;
  Director: string;
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Array<RatingInterface>
  Released: string;
  Runtime: string;
  Website: string;
  Writer: string;
  imdbRating: string;
  imdbVotes: string;
}