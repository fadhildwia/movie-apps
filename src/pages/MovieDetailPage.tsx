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
import ButtonActionCart from '../components/ButtonActionCart';

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
        <div className="max-w-4xl mx-auto px-4">
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
              <ButtonActionCart
                onClickAdd={handleAddToCart}
                onClickRemove={handleRemoveCart}
                size="half"
                quantity={findData?.quantity}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieDetailPage