import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="flex items-center text-gray-800">
      <button
        className={`p-2 mr-4 rounded ${currentPage === 1 ? '' : 'hover:bg-gray-100'}`}
        onClick={() => {
          onPageChange(currentPage - 1);
          scrollToTop();
        }}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {getVisiblePages().map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded ${
            currentPage === page ? 'bg-gray-200 text-gray-800 font-medium' : 'hover:bg-gray-100'
          }`}
          onClick={() => {
            onPageChange(page);
            scrollToTop();
          }}
        >
          {page}
        </button>
      ))}
      <button
        className={`p-2 mr-4 rounded ${currentPage === totalPages ? '' : 'hover:bg-gray-100'}`}
        onClick={() => {
          onPageChange(currentPage + 1);
          scrollToTop();
        }}
        disabled={currentPage === totalPages}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
