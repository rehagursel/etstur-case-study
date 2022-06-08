import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal";
import Button from "../UI/Button";
import useLocale from "../../hooks/use-locale";
import { deleteAddedHotel } from "../../lib/local-storage";
import { listActions } from "../../store/list-slice";

import classes from "./HotelDeleteModal.module.css";

const HotelDeleteModal = (props) => {
  const reduxDeleteHotelName = useSelector(
    (state) => state.list.deleteHotelName
  );
  const { sendRequest: sendDeleteRequest, status: deleteStatus } =
    useLocale(deleteAddedHotel);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteStatus !== "completed") {
      return;
    }
    dispatch(listActions.removeHotelFromList(reduxDeleteHotelName));
    const timer = setTimeout(() => {
      props.setModalIsShown(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [deleteStatus, reduxDeleteHotelName, props.setModalIsShown]);

  const deleteHotelHandler = () => {
    sendDeleteRequest(reduxDeleteHotelName);
  };

  const closeModalHandler = () => {
    props.setModalIsShown(false);
  };

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
    <Modal onClick={closeModalHandler}>
      <div className={classes.deleteModal}>
        <div className={classes.deleteModalMain}>
          <h1>Oteli Sil</h1>
          <p>
            <span>{reduxDeleteHotelName}</span>'i silmek istediğinizden emin
            misiniz?
          </p>
          <div className={classes.actionButtons}>
            {deleteButton}
            <Button
              className={"cancelBtn"}
              type="button"
              onClick={closeModalHandler}
            >
              VAZGEÇ
            </Button>
          </div>
        </div>
      </div>
      <Button className={"quit"} type="button" onClick={closeModalHandler}>
        &#x2715;
      </Button>
    </Modal>
  );
};

export default HotelDeleteModal;
