import React from 'react'

interface ButtonActionCartProps {
  onClickAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
  quantity?: number;
  size: 'half' | 'full'
  type?: 'count' | 'static'
}

const ButtonActionCart: React.FC<ButtonActionCartProps> = ({ onClickAdd, onClickRemove, quantity, size, type = 'count' }) => {
  return (
    <div className='flex gap-2 mt-2 flex-wrap md:flex-nowrap'>
      <button onClick={onClickAdd} className={`${size === 'full' ? 'w-full' : 'w-1/2'} flex gap-2 bg-gray-800 rounded p-2 hover:bg-gray-800 focus:outline-none`}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <div className="text-white uppercase text-xs font-semibold tracking-wider">
          {type === 'count' ? `Add to Cart ${quantity ? `(${quantity})` : ''}` : 'Add Item'}
        </div>
      </button>
      {(quantity || type === 'static') && (
        <button onClick={onClickRemove} className={`${size === 'full' ? 'w-full' : 'w-1/2'} flex gap-2 bg-red-800 rounded p-2 hover:bg-red-800 focus:outline-none`}>
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
  )
}

export default ButtonActionCart