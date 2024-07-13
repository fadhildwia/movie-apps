import React from "react"
import { formatCurrency } from "../utils/formatCurrency"
import { Link } from "react-router-dom"
import { MovieInterface } from "../types"
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import ButtonActionCart from "./ButtonActionCart";

interface MovieCardProps {
  movie: MovieInterface;
  onClickAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClickAdd, onClickRemove }) => {
  const cart = useSelector((state: RootState) => state.cart);

  const findData = cart.find((item) => item.imdbID === movie.imdbID)
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
            <h4 className="mt-1 text-xl font-bold uppercase leading-tight truncate">
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
            <ButtonActionCart
              onClickAdd={onClickAdd}
              onClickRemove={onClickRemove}
              size="full"
              quantity={findData?.quantity}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
