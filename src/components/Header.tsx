import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  const [search, setSearch] = useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      navigate(`/?search=${search}`);
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-800">
      <div className="container px-4 md:px-0 mx-auto py-4 flex justify-between items-center">
        <Link to="/" className="text-base md:text-2xl font-bold text-gray-50">Movie Apps</Link>
        <div className='flex justify-center items-center gap-4'>
          <form onSubmit={handleSearchSubmit}  className="relative text-gray-600">
            <input type="search" name="search" value={search} onChange={handleSearchChange} placeholder="Search" className="bg-white h-6 md:h-10 px-2 md:px-5 md:pr-10 rounded-full text-sm focus:outline-none" />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4 hidden md:block">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
            </button>
          </form>
          <Link to="/cart" className='relative'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className='absolute -top-2 -right-3 text-white bg-red-800 rounded text-[8px] md:text-xs px-1'>
              {totalQuantity}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
