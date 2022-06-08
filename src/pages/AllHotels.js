import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import HotelsList from "../components/hotels/HotelsList";
import NoHotelsFound from "../components/hotels/NoHotelsFound";
import { loadLocalListHotels } from "../lib/local-storage";
import useLocale from "../hooks/use-locale";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { listActions } from "../store/list-slice";

const AllHotels = (props) => {
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
    loadedHotels?.forEach((hotel) =>
      dispatch(listActions.addHotelToList(hotel))
    );
  }, [loadedHotels]);

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

  const hotelList = [...reduxHotelsList];

  return (
    <React.Fragment>
      <HotelsList hotels={hotelList} onClick={props.onShowModal} />
    </React.Fragment>
  );
};

export default AllHotels;
