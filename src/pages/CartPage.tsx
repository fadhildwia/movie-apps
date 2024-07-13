import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb';
import { calculatePrice } from '../utils/calculatePrice';
import { formatCurrency } from '../utils/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CartInterface, MovieInterface } from '../types';
import { addToCart, removeFromCart } from '../store/cartSlice';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, data: MovieInterface) => {
    event.preventDefault();
    dispatch(addToCart({ ...data, quantity: 1 }));
  };

  const handleRemoveCart = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
      dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto py-8">
      <Breadcrumb title="Cart" />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {cart.map((movie: CartInterface) => (
          <div className="flex bg-white shadow-lg rounded-lg">
            <img src={movie.Poster} className="w-1/3 bg-cover" />
            <div className="w-2/3 p-4 flex flex-col gap-1">
              <h1 className="text-gray-800 font-bold text-xl md:text-2xl">{movie.Title}</h1>
              <p className="text-gray-800">{movie.Year}</p>
              <p className="text-gray-800">{movie.Type}</p>
              {movie?.Year && <h1 className="text-gray-700 font-bold text-lg md:text-xl mt-2">{formatCurrency(calculatePrice(movie?.Year as string))}</h1>}
              <div className='mt-auto'>
                <div className='flex items-center gap-2'>
                  <p className="text-gray-800 font-semibold my-4">Quantity:</p>
                  <p className="text-gray-800 font-semibold my-4"> {movie.quantity}</p>
                </div>
                <div className='flex gap-2 mt-2 flex-wrap md:flex-nowrap'>
                  <button onClick={(e) => handleAddToCart(e, movie)} className='w-full flex gap-2 bg-gray-800 rounded p-2 hover:bg-gray-800 focus:outline-none'>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div className="text-white uppercase text-xs font-semibold tracking-wider">
                      Add Item
                    </div>
                  </button>
                  <button onClick={(e) => handleRemoveCart(e, movie.imdbID)} className="w-full flex gap-2 bg-red-800 rounded p-2 hover:bg-red-800 focus:outline-none">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div className="text-white uppercase text-xs font-semibold tracking-wider">
                      Remove from Cart
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="mt-4 flex text-center">
          <Link to="/checkout" className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 focus:outline-none text-3xl uppercase font-bold">
            Checkout
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartPage