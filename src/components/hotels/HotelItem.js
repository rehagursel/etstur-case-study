import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* import { useHistory } from "react-router-dom"; */

import Button from "../UI/Button";
import { editHotelScore } from "../../lib/local-storage";
import useLocale from "../../hooks/use-locale";
import { sortIsScoreActions } from "../../store/sort-slice";
import { listActions } from "../../store/list-slice";

import classes from "./HotelItem.module.css";

const HotelItem = (props) => {
  const [score, setScore] = useState(+props.score);
  const [isHover, setIsHover] = useState(false);
  const sortMethodIsScore = useSelector((state) => state.sort.sortIsScore);
  /* const hotelLogTime = useSelector((state) => state.list.hotelsLogTimes); */
  /* const { sendRequest: sendDeleteRequest, status: deleteStatus } =
    useLocale(deleteAddedHotel); */
  const { sendRequest: sendEditRequest, status: editStatus } =
    useLocale(editHotelScore);
  const dispatch = useDispatch();
  console.log("HotelItem");
  /* const history = useHistory(); */

  useEffect(() => {
    if (!sortMethodIsScore) {
      return;
    }
    const time = new Date();
    sendEditRequest({
      name: props.name,
      score: score,
      editTime: Date.parse(time),
      logTime: props.logTime,
    });
  }, [score]);

  useEffect(() => {
    /* if (deleteStatus === "completed") {
      dispatch(listActions.removeHotelFromList(props.name)); */

    if (editStatus === "completed") {
      dispatch(
        listActions.editHotelAtTheList({ name: props.name, score: score })
      );
    }
  }, [/* deleteStatus, */ editStatus, score]);

  const saveHotelNameHandler = () => {
    dispatch(listActions.saveHotelName(props.name));
    /* sendDeleteRequest(props.name); */
    /*  history.push("/hotels-list"); */
  };

  const incrementHandler = () => {
    if (score < 10) {
      setScore((score) => +(score + 0.1).toFixed(1));
    }
    dispatch(sortIsScoreActions.sort(true));
  };

  const decrementHandler = () => {
    if (score > 0.1) {
      setScore((score) => +(score - 0.1).toFixed(1));
    }
    dispatch(sortIsScoreActions.sort(true));
  };

  const deleteButtonAddHandler = () => {
    setIsHover(true);
  };

  const deleteButtonKillHandler = () => {
    setIsHover(false);
  };

  return (
    <li className={classes.item}>
      <div
        onMouseEnter={deleteButtonAddHandler}
        onMouseLeave={deleteButtonKillHandler}
        className={classes.cover}
      >
        <img src={props.src} alt="hotel-cover" />
        <div className={classes.infoBox}>
          <h1 className={classes.hotelName}>{props.name}</h1>
          <p className={classes.score}>{score} Puan</p>
          <Button
            className={"increment"}
            type="button"
            onClick={incrementHandler}
          >
            PUAN ARTIR
          </Button>
          <Button
            className={"decrement"}
            type="button"
            onClick={decrementHandler}
          >
            PUAN AZALT
          </Button>
        </div>
        {isHover && (
          <Button
            className={"delete"}
            type="button"
            onClick={() => {
              saveHotelNameHandler();
              props.onClick();
            }}
          >
            &#x2715;
          </Button>
        )}
      </div>
    </li>
  );
};

export default HotelItem;
