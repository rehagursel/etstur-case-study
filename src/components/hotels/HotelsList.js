import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HotelItem from "./HotelItem";
import { sortIsScoreActions } from "../../store/sort-slice";
import Pagination from "../../components/pagination/Pagination";
import classes from "./HotelsList.module.css";

const sortHotelsAsScore = (hotels, ascending) => {
  return hotels?.sort((hotelA, hotelB) => {
    if (ascending) {
      return +hotelA.score > +hotelB.score ? 1 : -1;
    } else {
      return +hotelA.score < +hotelB.score ? 1 : -1;
    }
  });
};

/* let PageSize = 10; */

/* const sortHotelsAsScore = (hotels, ascending) => {
    if (sortMethodIsScore) {
      return hotels?.sort((hotelA, hotelB) => {
        if (ascending) {
          return +hotelA.score > +hotelB.score ? 1 : -1;
        } else {
          return +hotelA.score < +hotelB.score ? 1 : -1;
        }
      });
    } else {
      return +hotelA.logTime < +hotelB.logTime ? 1 : -1;
    }
  }; */

/* if (sortMethodIsScore ) {
    reduxHotelsList?.sort((a, b) =>
      a.score < b.score ? 1 : b.score < a.score ? -1 : 0
    );
  } else {
    reduxHotelsList?.sort((a, b) =>
      a.logTime < b.logTime ? 1 : b.logTime < a.logTime ? -1 : 0
    );
  } */

const HotelsList = (props) => {
  const [isSort, setIsSort] = useState(false);
  const [hotelsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  
  
  const sortMethodIsScore = useSelector((state) => state.sort.sortIsScore);
  const dispatch = useDispatch();
  console.log("HotelsList");

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";

  function changeSortHandler() {
    dispatch(sortIsScoreActions.sort(false));
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });

    setIsSort(true);
  }

  let sortedHotels = props.hotels;

  /* if (isSort) {
    sortedHotels = sortHotelsAsScore(props.hotels, isSortingAscending);
  } else {
    if (sortMethodIsScore) {
      sortedHotels?.sort((a, b) =>
        a.score < b.score ? 1 : b.score < a.score ? -1 : 0
      );
    } else {
      console.log("siratesti1",sortedHotels)
      sortedHotels?.sort((a, b) =>
        a.logTime < b.logTime ? 1 : b.logTime < a.logTime ? -1 : 0
       
      );
      console.log("siratesti2",sortedHotels)
    }
  } */

  /* console.log("sortMethodIsScore", sortMethodIsScore);
  console.log("isSort", isSort);
  console.log("siratesti1gelis", sortedHotels); */
  sortedHotels?.sort((a, b) =>
    a.logTime < b.logTime ? 1 : b.logTime < a.logTime ? -1 : 0
  );
  /* console.log("siratesti2LOG", sortedHotels); */

  if (sortMethodIsScore) {
    sortedHotels?.sort((a, b) =>
      a.score > b.score ? 1 : a.score < b.score ? -1 : 0
    );
  }
  /* console.log("siratesti3score", sortedHotels); */
  if (isSort) {
    sortedHotels = sortHotelsAsScore(props.hotels, isSortingAscending);
  }
  /* console.log("siratesti4Issort", sortedHotels); */

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = sortedHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => {
   
    setCurrentPage(pageNumber)
   
  }

  return (
    <React.Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
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
            onClick={props.onClick}
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
