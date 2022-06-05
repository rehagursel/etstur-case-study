export function loadAddedHotels() {
  const addedHotels = [];

  Object.keys(localStorage).forEach((key) => {
    let obj = localStorage.getItem(key);
    addedHotels.unshift(JSON.parse(obj));
  });

  addedHotels.sort((a, b) =>
    a.logTime < b.logTime ? 1 : b.logTime < a.logTime ? -1 : 0
  );
  return addedHotels;
}

export function editHotelScore(hotel) {
  localStorage.setItem(
    hotel.name,
    JSON.stringify({
      id: hotel.name,
      score: hotel.score,
      name: hotel.name,
      src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
      logTime: hotel.logTime,
    })
  );
  return null;
}

export function saveAddedHotel(hotel) {
  if (Object.keys(localStorage).includes(hotel.name)) {
    throw new Error("Bu otel listede mevcut");
  } else {
    localStorage.setItem(
      hotel.name,
      JSON.stringify({
        id: hotel.name,
        score: hotel.score,
        name: hotel.name,
        src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
        logTime: hotel.logTime,
      })
    );
    return null;
  }
}

export function deleteAddedHotel(name) {

   localStorage.removeItem(name);
    
  return null;
}
