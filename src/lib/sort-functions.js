export const sortHotelsAsScore = (hotels, descending) => {
  return hotels?.sort((hotelA, hotelB) => {
    if (descending) {
      return +hotelA.score < +hotelB.score ? 1 : -1;
    } else {
      return +hotelA.score > +hotelB.score ? 1 : -1;
    }
  });
};

export const sortHotelsAsScoreChange = (hotels) => {
  return hotels?.sort((hotelA, hotelB) => {
    return hotelA.score > hotelB.score
      ? 1
      : hotelA.score < hotelB.score
      ? -1
      : 0 || hotelA.editTime > hotelB.editTime
      ? 1
      : hotelA.editTime < hotelB.editTime
      ? -1
      : 0;
  });
};
