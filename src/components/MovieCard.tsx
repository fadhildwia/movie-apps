import React from "react"
import { formatCurrency } from "../utils/formatCurrency"
import { Link } from "react-router-dom"
import { MovieInterface } from "../types"

const MovieCard: React.FC<{ movie: MovieInterface }> = ({ movie }) => {
  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(movie.imdbID)
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="wrapper antialiased text-gray-900">
      <div>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full object-cover rounded-lg shadow-md"
        />

        <div className="relative px-4 -mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
              {movie.Title}
            </h4>

            <div className="mt-1">
              {formatCurrency(movie.Price as number)}
            </div>
            <div className="mt-4">
              <span className="text-teal-600 text-md font-semibold">
                {movie.Year}{" "}
              </span>
              <span className="text-sm text-gray-600">
                ({movie.Type})
              </span>
            </div>
            <button onClick={handleAddToCart} className="mt-2 flex gap-2 bg-gray-800 rounded p-2 hover:bg-gray-700 focus:outline-none">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="ml-2 text-white uppercase text-xs font-semibold tracking-wider">
                Add to Cart
              </div>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
