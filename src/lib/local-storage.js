export function loadLocalListHotels() { 
  const addedHotels = [];

  Object.keys(localStorage).forEach((key) => {
    let obj = localStorage.getItem(key);
    addedHotels.unshift(JSON.parse(obj));
  });

  return addedHotels;
}

export function editHotelScore(hotel) {
  localStorage.setItem(
    hotel.name,
    JSON.stringify({
      key: hotel.name,
      id: hotel.name,
      score: hotel.score,
      name: hotel.name,
      src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
      editTime: hotel.editTime,
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
        key: hotel.name,
        id: hotel.name,
        score: hotel.score,
        name: hotel.name,
        src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
        editTime: hotel.editTime,
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
