import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import NewHotelForm from "../components/hotels/NewHotelForm";
import useLocale from "../hooks/use-locale";
import { saveAddedHotel } from "../lib/local-storage";
import { listActions } from "../store/list-slice";
import { sortIsScoreActions } from "../store/sort-slice";

const NewHotel = () => {
  const {
    sendRequest: sendSaveRequest,
    status,
    error,
  } = useLocale(saveAddedHotel);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (status !== "completed") {
      return;
    }
    const timer = setTimeout(() => {
      history.push("/hotels-list");
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [status, history]);

  const loadHotelHandler = (newHotelData) => {
    dispatch(sortIsScoreActions.sort(false));
    sendSaveRequest(newHotelData);
    dispatch(listActions.addHotelToList(newHotelData));
  };

  return (
    <React.Fragment>
      <NewHotelForm
        statusType={{ status: status, error: error }}
        onAddHotel={loadHotelHandler}
      />
    </React.Fragment>
  );
};

export default NewHotel;
