import React from "react";
/* import { useLocation } from "react-router-dom"; */
import { Link } from "react-router-dom";
import classes from "./Pagination.module.css";

const Pagination = ({ hotelsPerPage, totalHotels, paginate }) => {
  const pageNumbers = [];
  /* const params = useParams(); */
  /*  const location = useLocation(); */

  /*  const queryParams = new URLSearchParams(location.search); */
  /* console.log("adsaedadwawda",location); */

  for (let i = 1; i <= Math.ceil(totalHotels / hotelsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={classes.pageItem}>
            {
              <span
                className={classes.pageLink}
                onClick={() => paginate(number)}
              >
                {number}
              </span>
            }
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
