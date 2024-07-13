import React from 'react'
import useGetDetailMovie from '../hooks/useGetDetailMovie';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { calculatePrice } from '../utils/calculatePrice';
import { formatCurrency } from '../utils/formatCurrency';
import Breadcrumb from '../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, removeFromCart } from '../store/cartSlice';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  const { data: detailMovie, isLoading: loadingDetailMovie } = useGetDetailMovie({ id: id as string, options: { enabled: !!id} });

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (detailMovie) {
      dispatch(addToCart({ ...detailMovie, quantity: 1 }));
    }
  };

  const handleRemoveCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (detailMovie) {
      dispatch(removeFromCart(detailMovie.imdbID));
    }
  };

  const findData = cart.find((item) => item.imdbID === detailMovie?.imdbID)
  return (
    <>
    {loadingDetailMovie ? (
      <Loader enabled={loadingDetailMovie} />
    ) : (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb title={detailMovie?.Title as string} />
        <div className="flex items-center flex-wrap md:flex-nowrap gap-8">
          <img src={detailMovie?.Poster} alt={detailMovie?.Title} className="rounded-lg w-64 h-auto" />
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">{detailMovie?.Title}</h1>
            <div className='flex gap-2 sm:gap-10'>
              <p className="text-gray-800 mb-2">{detailMovie?.Year}</p>
              <p className="text-gray-800 mb-2">{detailMovie?.Runtime}</p>
              <p className="text-gray-800 mb-2">{detailMovie?.Genre}</p>
            </div>
            <p className="text-gray-800 mb-4 font-semibold">{detailMovie?.Plot}</p>
            <p className="text-gray-800 mb-2"><span className="font-bold">Director:</span> {detailMovie?.Director}</p>
            <p className="text-gray-800 mb-4"><span className="font-bold">Actors:</span> {detailMovie?.Actors}</p>
            {detailMovie?.Year as string && <p className="text-gray-800 font-bold">Price: {formatCurrency(calculatePrice(detailMovie?.Year as string))}</p>}
            <div className='flex gap-2 mt-2 flex-wrap md:flex-nowrap'>
              <button onClick={handleAddToCart} className={`${findData ? 'w-full' : 'w-1/2'} flex gap-2 bg-gray-800 rounded p-2 hover:bg-gray-800 focus:outline-none`}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div className="text-white uppercase text-xs font-semibold tracking-wider">
                  Add to Cart {findData ? `(${findData.quantity})` : ''}
                </div>
              </button>
              {findData && (
                <button onClick={handleRemoveCart} className="w-full flex gap-2 bg-red-800 rounded p-2 hover:bg-red-800 focus:outline-none">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="text-white uppercase text-xs font-semibold tracking-wider">
                    Remove from Cart
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default MovieDetailPage