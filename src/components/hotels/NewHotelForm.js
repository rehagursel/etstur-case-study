import React, { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import Button from "../UI/Button";
/* import { setAddedHotel } from "../../lib/local-storage"; */
import classes from "./NewHotelForm.module.css";

const NewBookForm = (props) => {
  const [isEntered, setIsEntered] = useState(false);
  const nameInputRef = useRef();
  const scoreInputRef = useRef();
  console.log("NewHotelForm");

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredScore = scoreInputRef.current.value;
    const time = new Date();

    props.onAddHotel({
      name: enteredName,
      score: enteredScore,
      /* editTime: Date.parse(time), */
      logTime: Date.parse(time),
    });
  }

  function formFocusedHandler() {
    setIsEntered(true);
  }

  function finishFocusedHandler() {
    setIsEntered(false);
  }

  if (props.statusType.status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  let checkButton = (
    <Button className={"add"} type="submit" onClick={finishFocusedHandler}>
      EKLE
    </Button>
  );

  if (props.statusType.status === "completed") {
    checkButton = (
      <Button
        className={"addConfirm"}
        type="submit"
        onClick={finishFocusedHandler}
      >
        &#x2713; EKLENDİ
      </Button>
    );
  }

  return (
    <React.Fragment>
      <Prompt
        when={isEntered}
        message="Are you sure, you want to leave? Entered data will be lost!!"
      />
      <Card>
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
          onFocus={formFocusedHandler}
        >
          {props.status === "pending" && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="name">Otel Adı</label>
            <input required type="text" id="name" ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="score">Puan</label>
            <input
              required
              type="number"
              step=".1"
              id="score"
              max="10"
              min="1"
              ref={scoreInputRef}
            />
          </div>
          {checkButton}
          {props.statusType.status === "error" && (
            <div className={classes.warning}>{props.statusType.error}</div>
          )}
        </form>
      </Card>
    </React.Fragment>
  );
};

export default NewBookForm;
