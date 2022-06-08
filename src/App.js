import React, { useState, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AllHotels from "./pages/AllHotels";
import Layout from "./components/layout/Layout";
import HotelDeleteModal from "./components/hotels/HotelDeleteModal";

const NewHotel = React.lazy(() => import("./pages/NewHotel"));

function App() {
  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  return (
    <Layout>
      <Suspense>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/hotels-list" />
          </Route>
          {modalIsShown && (
            <HotelDeleteModal
              modalIsShown={modalIsShown}
              setModalIsShown={setModalIsShown}
            />
          )}
          <Route path="/hotels-list" exact>
            <AllHotels onShowModal={showModalHandler} />
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
