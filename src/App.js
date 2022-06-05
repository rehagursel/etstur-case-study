import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import AllHotels from "./pages/AllHotels";
import Layout from "./components/layout/Layout";
import { saveAddedHotel } from "./lib/local-storage";

const NewHotel = React.lazy(() => import("./pages/NewHotel"));

const dummyHotelsList= [
  {
    id: "vygh",
    score: 9,
    name: "Voyage Hotel",
    src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
    logTime: "2022-06-04T08:25:37.408Z",
  },
  {
    id: "vgh",
    score: 6.1,
    name: "Vogue Hotel",
    src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
    logTime: "2022-06-04T07:25:37.408Z",
  },
  {
    id: "mrh",
    score: 8.4,
    name: "Maxx Royal Hotel",
    src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
    logTime: "2022-06-04T06:25:37.408Z",
  },
  {
    id: "kh",
    score: 7,
    name: "Kaya Hotel",
    src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
    logTime: "2022-06-04T05:25:37.408Z",
  },
  {
    id: "ph",
    score: 6,
    name: "Prince Hotel",
    src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
    logTime: "2022-06-04T04:25:37.408Z",
  },
  {
    id: "ah",
    score: 6.3,
    name: "Art Hotel",
    src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
    logTime: "2022-06-04T03:25:37.408Z",
  },
  {
    id: "gh",
    score: 4.9,
    name: "Grand Hotel",
    src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
    logTime: "2022-06-04T02:25:37.408Z",
  }
]
try{
  dummyHotelsList.forEach((hotel) => saveAddedHotel(hotel));
} catch{
  
}

function App() {
  return (
    <Layout>
      <Suspense>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/hotels-list" />
          </Route>
          <Route path="/hotels-list" exact>
            <AllHotels />
          </Route>
          <Route path="/new-hotel">
            <NewHotel />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
