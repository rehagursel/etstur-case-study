import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import HotelsList from "../components/hotels/HotelsList";
import { loadLocalListHotels } from "../lib/local-storage";
import useLocale from "../hooks/use-locale";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { listActions } from "../store/list-slice";
/* import Pagination from "../components/pagination/Pagination" */

const NoHotelsFound = React.lazy(() =>
  import("../components/hotels/NoHotelsFound")
);

const AllHotels = (props) => {
  /* const [hotelsPerPage, setHotelsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1) */
  const reduxHotelsList = useSelector((state) => state.list.hotelsList);
  const dispatch = useDispatch();

  

  const {
    sendRequest: sendLoadRequest,
    status,
    data: loadedHotels,
  } = useLocale(loadLocalListHotels, true);

  useEffect(() => {
    sendLoadRequest();
  }, []);

  useEffect(() => {
    console.log("AllHotels");
    loadedHotels?.forEach((hotel) =>
      dispatch(listActions.addHotelToList(hotel))
    );
  }, [loadedHotels]);

 /*  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentPosts = reduxHotelsList.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber) */

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedHotels.length === 0) {
    return <NoHotelsFound />;
  }

  /* console.log("reduxhotelslist", reduxHotelsList); */
  const hotelList = [...reduxHotelsList];
  return (
    <React.Fragment>
      <HotelsList hotels={hotelList} onClick={props.onShowModal} />
      {/* <Pagination hotelsPerPage={hotelsPerPage} totalHotels={reduxHotelsList.length} paginate={paginate} /> */}
    </React.Fragment>
  );
};

export default AllHotels;
