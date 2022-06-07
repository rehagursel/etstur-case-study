import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { deleteAddedHotel } from "../../lib/local-storage";
import useLocale from "../../hooks/use-locale";
import { listActions } from "../../store/list-slice";

/* import classes from "./HotelDeleteModal.module.css"; */

const HotelDeleteModal = (props) => {
  const reduxDeleteHotelName = useSelector(
    (state) => state.list.deleteHotelName
  );
  const { sendRequest: sendDeleteRequest, status: deleteStatus } =
    useLocale(deleteAddedHotel);
  const dispatch = useDispatch();
  const history = useHistory();
  

  useEffect(() => {
    if (deleteStatus !== "completed") {
      return;
    }
    dispatch(listActions.removeHotelFromList(reduxDeleteHotelName));
    history.push("/hotels-list");
  }, [deleteStatus, reduxDeleteHotelName]);

  const deleteHotelHandler = () => {
    sendDeleteRequest(reduxDeleteHotelName);
  };
  console.log("reduxDeleteHotelName", reduxDeleteHotelName);

  let deleteButton = (
    <Button
        className={"deleteHotelBtn"}
        type="button"
        onClick={deleteHotelHandler}
      >
        OTELİ SİL
      </Button>
  );

  if (deleteStatus === "completed") {
    deleteButton = (
      <Button
        className={"deleteHotelBtnConfirm"}
        type="button"
        onClick={deleteHotelHandler}
      >
        &#x2713; SİLİNDİ
      </Button>
    );
  }

  return (
    <Modal onClick={props.onHideModal}>
      {/* <div className={classes.total}> */}
      <h1>Oteli Sil</h1>
      <p>{reduxDeleteHotelName}'i silmek istediğinizden emin misiniz?</p>
      {/* </div> */}
      {/* <div className={classes.actions}> */}
      {deleteButton}
      <Button className={"cancelBtn"} type="button" onClick={props.onHideModal}>
        VAZGEÇ
      </Button>
      <Button className={"quit"} type="button" onClick={props.onHideModal}>
        &#x2715;
      </Button>
      {/* </div> */}
    </Modal>
  );
};

export default HotelDeleteModal;
