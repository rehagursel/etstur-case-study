import React, { useContext, useState, useEffect } from "react";

import HotelsList from "../components/hotels/HotelsList";
import NoHotelsFound from "../components/hotels/NoHotelsFound";
import { loadAddedHotels } from "../lib/local-storage";
import useLocale from "../hooks/use-locale";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const AllHotels = () => {


  const {
    sendRequest,
    status,
    data: loadedHotels,
  } = useLocale(loadAddedHotels, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    status === "completed" &&
    (!loadedHotels || loadedHotels.length === 0) 
  ) {
    return <NoHotelsFound />;
  }

  const loadedHotelslist = [...loadedHotels]
  console.log(loadedHotelslist)

  return (
    <React.Fragment>
      <HotelsList hotels={loadedHotelslist} />
    </React.Fragment>
  );
};

export default AllHotels;
