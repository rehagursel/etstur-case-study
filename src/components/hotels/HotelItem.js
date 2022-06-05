import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { editHotelScore } from "../../lib/local-storage";
import classes from "./HotelItem.module.css";

const HotelItem = (props) => {
  const [score, setScore] = useState(+props.score);
  /* const scoreInputRef = useRef()
   */
  const time = new Date();

  useEffect(() => {
    editHotelScore({
      name: props.name,
      score: score,
      logTime: time,
    });
  }, [score]);

  const incrementHandler = () => {
    setScore((score) => +(score + 0.1).toFixed(1));
  };

  const decrementHandler = () => {
    setScore((score) => +(score - 0.1).toFixed(1));
  };

  return (
    <li className={classes.item}>
      <div className={classes.cover}>
        <img src={props.src} alt="hotel-cover" />
        <div className={classes.infoBox}>
          <h1 className={classes.hotelName}>{props.name}</h1>
          <p className={classes.score} /* ref={scoreInputRef} */>{score}</p>
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
      </div>
    </li>
  );
};

export default HotelItem;
