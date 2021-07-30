import React from 'react';
import { useState } from 'react/cjs/react.development';
import Modal from '../../UI/Modal/Modal';
import styles from './Event.module.css';

const Event = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const style = {
    marginLeft: props.left,
    marginTop: props.top,
    background: props.color,
    width: props.width,
    height: props.height,
  };
  let startTime =
    props.eventStart.slice(0, 2) + ':' + props.eventStart.slice(2);
  let endTime = props.eventEnd.slice(0, 2) + ':' + props.eventEnd.slice(2);

  const modalHandler = () => {
    console.log('Modal action is called');
    setIsModalOpen(prevState => {
      return !prevState;
    });
  };

  const modalContent = (
    <>
      <h3 className={styles['modal-title']}>Event {props.eventName}</h3>
      <p className={styles['modal-sub']}>Start: {startTime}</p>
      <p className={styles['modal-sub']}>End: {endTime}</p>
      <button onClick={modalHandler} className={styles['modal-close']}>
        Close
      </button>
    </>
  );
  return (
    <React.Fragment>
      {isModalOpen && <Modal onClose={modalHandler}>{modalContent}</Modal>}
      <div data-testid="event" onClick={modalHandler}>
        <div style={style} className={styles['event-div']}>
          {props.eventName}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Event;
