import { Link } from "react-router-dom";

import classes from "./NoHotelsFound.module.css";

const NoHotelsFound = () => {
  return (
    <div className={classes.nolist}>
      <p>No hotels found!</p>
      <Link to="/new-hotel" className="btn">
        Add New Hotel
      </Link>
    </div>
  );
};

export default NoHotelsFound;
