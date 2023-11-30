import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../app/slices/beerSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.beers.page);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };
  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => handlePageChange(1)}>
            {currentPage}
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination