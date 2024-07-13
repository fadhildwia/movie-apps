import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb';
import { calculatePrice } from '../utils/calculatePrice';
import { formatCurrency } from '../utils/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CartInterface, MovieInterface } from '../types';
import { addToCart, removeFromCart } from '../store/cartSlice';
import ButtonActionCart from '../components/ButtonActionCart';

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

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (calculatePrice(item?.Year as string) * item.quantity), 0);
  return (
    <div className="container mx-auto py-8">
      <Breadcrumb title="Cart" />
      {cart.length > 0 ? (
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {cart.map((movie: CartInterface, index) => (
              <div key={index} className="flex bg-white shadow-lg rounded-lg">
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
                    <ButtonActionCart
                      onClickAdd={(e) => handleAddToCart(e, movie)}
                      onClickRemove={(e) => handleRemoveCart(e, movie.imdbID)}
                      size="full"
                      type='static'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=' bg-gray-800 text-white flex flex-col gap-2 p-4 font-semibold text-lg'>
            <div className='flex justify-between gap-2'>
              <p>Total Item:</p>
              <p> {totalQuantity}</p>
            </div>
            <div className='flex justify-between gap-2'>
              <p>Total Price:</p>
              <p> {formatCurrency(totalPrice)}</p>
            </div>
          </div>
          <div className="flex text-center">
            <Link to="/checkout" className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 focus:outline-none text-3xl uppercase font-bold">
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div>You currently have no items in your cart</div>
      )}
    </div>
  )
}

export default CartPage