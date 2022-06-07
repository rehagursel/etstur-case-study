import { Link } from "react-router-dom";

import classes from "./NoHotelsFound.module.css";

const NoHotelsFound = () => {
  
  return (
    <div className={classes.noHotel}>
      <p>Otel listesi boş!</p>
      <Link to="/new-hotel" className="btn">
        Yeni Otel Ekle
      </Link>
    </div>
  );
};

export default NoHotelsFound;
