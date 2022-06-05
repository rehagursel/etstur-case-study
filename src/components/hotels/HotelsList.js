import { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import HotelItem from "./HotelItem";
import classes from "./HotelsList.module.css";

const sortHotels = (hotels, ascending) => {
  return hotels.sort((hotelA, hotelB) => {
    if (ascending) {
      return +hotelA.score > +hotelB.score ? 1 : -1;
    } else {
      return +hotelA.score < +hotelB.score ? 1 : -1;
    }
  });
};

const HotelsList = (props) => {
  const [isSort, setIsSort] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";

  function changeSortHandler() {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
    setIsSort(true);
  }

  let sortedHotels = props.hotels;

  if (isSort === true) {
    sortedHotels = sortHotels(props.hotels, isSortingAscending);
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
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default HotelsList;
