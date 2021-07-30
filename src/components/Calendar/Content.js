import React, { useContext, useEffect } from 'react';
import Calendar from './Calendar';
import styles from './Content.module.css';
import AppContext from '../../store/app-context';

const Content = props => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    console.log(appCtx.eventsURL);
    fetch(appCtx.eventsURL)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        appCtx.setEvents(json);
      });
  }, []);

  return (
    <div className={styles['main-content']}>
      <Calendar />
    </div>
  );
};

export default Content;
