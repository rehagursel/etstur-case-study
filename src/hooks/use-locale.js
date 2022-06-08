import { useReducer, useCallback } from "react";

function localeReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "error",
    };
  }

  return state;
}

function useLocale(requestFunction, startWithPending = false) {
  const [localeState, dispatch] = useReducer(localeReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message,
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...localeState,
  };
}

export default useLocale;
