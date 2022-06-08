import React, { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import Button from "../UI/Button";
import Input from "../UI/Input";

import classes from "./NewHotelForm.module.css";

const NewBookForm = (props) => {
  const [isEntered, setIsEntered] = useState(false);

  const nameInputRef = useRef();
  const scoreInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredScore = scoreInputRef.current.value;
    const time = new Date();

    props.onAddHotel({
      name: enteredName,
      score: enteredScore,
      logTime: Date.parse(time),
      editTime: Date.parse(time),
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
            <Input
              className={classes.control}
              ref={nameInputRef}
              label={"Otel Adı"}
              input={{
                htmlFor: "name",
                id: "name",
                type: "text",
              }}
            />
          </div>
          <div className={classes.control}>
            <Input
              ref={scoreInputRef}
              label={"Puan"}
              input={{
                htmlFor: "score",
                id: "score",
                type: "number",
                min: "1",
                max: "10",
                step: ".1",
              }}
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
