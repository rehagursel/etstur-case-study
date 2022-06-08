import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HotelItem from "./HotelItem";
import { sortIsScoreActions } from "../../store/sort-slice";
import {
  sortHotelsAsScore,
  sortHotelsAsScoreChange,
} from "../../lib/sort-functions";
import Pagination from "../../components/pagination/Pagination";
import classes from "./HotelsList.module.css";

const HotelsList = ({ hotels, onClick }) => {
  const [isSort, setIsSort] = useState(false);
  const [hotelsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const [isSortingDescending, setIsSortingDescending] = useState(false);

  const sortMethodIsScore = useSelector((state) => state.sort.sortIsScore);
  const dispatch = useDispatch();

  function changeSortHandler() {
    dispatch(sortIsScoreActions.sort(false));
    setIsSortingDescending((isSortingDescending) => !isSortingDescending);
    setIsSort(true);
  }

  let sortedHotels = hotels;

  if (sortMethodIsScore) {
    sortedHotels = sortHotelsAsScoreChange(hotels);
  }

  if (isSort) {
    sortedHotels = sortHotelsAsScore(hotels, isSortingDescending);
  }

  const currentHotels = sortedHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <React.Fragment>
      <div className={classes.addButton}>
        <Link to="/new-hotel" className="addBtn">
          +
        </Link>
        <p>OTEL EKLE</p>
      </div>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {isSortingDescending ? "Ascending" : "Descending"}
        </button>
      </div>
      <ul className={classes.list}>
        {currentHotels.map((hotel) => (
          <HotelItem
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            score={+hotel.score}
            logTime={hotel.logTime}
            src={hotel.src}
            onClick={onClick}
          />
        ))}
      </ul>
      <Pagination
        hotelsPerPage={hotelsPerPage}
        totalHotels={sortedHotels.length}
        paginate={paginate}
      />
    </React.Fragment>
  );
};

export default HotelsList;
