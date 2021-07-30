import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import styles from "./Header.module.css";

const dictOfMonths = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const getCurrentDateTime = (date) => {
  let day = date.getDay();
  let month = dictOfMonths[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  const currDate = `${day}-${month}-${year}`;
  const currTime = `${hours}:${minutes < 9 ? "0" + minutes : minutes}:${
    seconds < 9 ? "0" + seconds : seconds
  }`;
  return currDate + "  " + currTime;
};

const Header = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      console.log("fetching new date time object");
      setCurrentDate(new Date());
    }, 1000);
  }, []);
  return (
    <header className={styles["site-header"]}>
      <div className={styles["site-header__container"]}>
        <h1 data-testid="header-text">Welcome</h1>
        <nav className={styles["site-header__nav"]}>
          <ul>
            <li>{getCurrentDateTime(currentDate)}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
