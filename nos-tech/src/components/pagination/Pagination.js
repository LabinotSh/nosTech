import React from 'react';
import './Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (

      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number}  className=''>
            <button onClick={() => paginate(number)} className='page-link-pag'> 
            {pageNumbers == 1 
            ? ''
            : number}
            </button>
          </li>
        ))}
      </ul>
    
  );
};

export default Pagination;
