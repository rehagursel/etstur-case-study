import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { editHotelScore, deleteAddedHotel } from "../../lib/local-storage";
import useLocale from "../../hooks/use-locale";
import classes from "./HotelItem.module.css";

const HotelItem = (props) => {
  const [score, setScore] = useState(+props.score);
  const [isHover, setIsHover] = useState(false);
  const { sendRequest, status } = useLocale(deleteAddedHotel);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/hotels-list");
    }
  }, [status, history]);

  const time = new Date();

  useEffect(() => {
    editHotelScore({
      name: props.name,
      score: score,
      logTime: time,
    });
  }, [score]);

  const deleteHotelHandler = () => {
    sendRequest(props.name);
  };

  const incrementHandler = () => {
    setScore((score) => +(score + 0.1).toFixed(1));
  };

  const decrementHandler = () => {
    setScore((score) => +(score - 0.1).toFixed(1));
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
            onClick={deleteHotelHandler}
          >
            &#x2715;
          </Button>
        )}
      </div>
    </li>
  );
};

export default HotelItem;
