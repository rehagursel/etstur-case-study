import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import NewHotelForm from "../components/hotels/NewHotelForm";
import useLocale from "../hooks/use-locale";
import { saveAddedHotel } from "../lib/local-storage";
import { listActions } from "../store/list-slice";

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
    console.log("NewHotel-UE");
    const timer = setTimeout(() => {
      console.log("NewHotel-UE-settimeout");
      history.push("/hotels-list");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [status, history]);

  const loadHotelHandler = (newHotelData) => {
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
