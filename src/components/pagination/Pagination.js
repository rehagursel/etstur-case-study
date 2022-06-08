import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ hotelsPerPage, totalHotels, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalHotels / hotelsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.paginationDiv}>
      <nav>
        <ul className={classes.pagination}>
          <span>
            <i className="arrow left"></i>
          </span>
          {pageNumbers.map((number) => (
            <li key={number} className={classes.pageItem}>
              {
                <button
                  className={classes.pageLink}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              }
            </li>
          ))}
          <span>
            <i className="arrow right"></i>
          </span>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
