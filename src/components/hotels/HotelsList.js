import { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HotelItem from "./HotelItem";
import { sortIsScoreActions } from "../../store/sort-slice";
/* import { deleteAddedHotel } from "../../lib/local-storage"; */
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
  const history = useHistory();
  const location = useLocation();
  const sortMethodIsScore = useSelector((state) => state.sort.sortIsScore);
  /* console.log("HotelsList-sortMethodIsScore", sortMethodIsScore); */
  const dispatch = useDispatch();
  console.log("HotelsList");

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";

  function changeSortHandler() {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
    dispatch(sortIsScoreActions.sort());
    setIsSort(true);
  }

  let sortedHotels = props.hotels;

  if (isSort) {
    sortedHotels = sortHotelsAsScore(props.hotels, isSortingAscending);
  } else {
    if (sortMethodIsScore) {
      sortedHotels?.sort((a, b) =>
        a.score < b.score ? 1 : b.score < a.score ? -1 : 0
      );
    } else {
      sortedHotels?.sort((a, b) =>
        a.logTime < b.logTime ? 1 : b.logTime < a.logTime ? -1 : 0
      );
    }
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedHotels.map((hotel) => (
          <HotelItem
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            score={+hotel.score}
            src={hotel.src}
            onClick={props.onClick}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default HotelsList;
