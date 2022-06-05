import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import NewHotelForm from "../components/hotels/NewHotelForm";
import useLocale from "../hooks/use-locale";
import {saveAddedHotel} from "../lib/local-storage";
/* import setAddedHotel from "../lib/local-storage"; */
import Button from "../components/UI/Button";

const NewHotel = () => {
  const { sendRequest, status, error } = useLocale(saveAddedHotel);
  const history = useHistory();


  useEffect(() => {
    if (status === "completed") {
      setTimeout(() => {
        history.push("/hotels-list");
      },1000)
    }
  }, [status, history])

  const loadHotelHandler = (newHotelData) => {
    sendRequest(newHotelData);
  };

  return (
    <React.Fragment>
      <NewHotelForm statusType={{status:status, error:error}} onAddHotel={loadHotelHandler} />
    </React.Fragment>
  );
};

export default NewHotel;
