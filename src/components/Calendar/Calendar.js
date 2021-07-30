import React, { useContext } from 'react';
import styles from './Calendar.module.css';
import AppContext from '../../store/app-context';
import Event from './Event/Event';
import { useState } from 'react/cjs/react.development';

/*
  This function will generate random colors for the event blocks.
  the generated colors aren't very beautiful though.
*/
function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getMinutesBetween = (start, end) => {
  let startStr = start.slice(0, 2) + ':' + start.slice(2);
  let endStr = end.slice(0, 2) + ':' + end.slice(2);

  //create date format
  // here we just need the time difference on the same day
  // so fixing the date to 01-01-2021 for convenience
  let timeEndHrs = new Date('01/01/2021 ' + endStr).getHours();
  let timeStartHrs = new Date('01/01/2021 ' + startStr).getHours();
  let timeEndMins = new Date('01/01/2021 ' + endStr).getMinutes();
  let timeStartMins = new Date('01/01/2021 ' + startStr).getMinutes();

  //retuns the time difference in minutes
  return (timeEndHrs - timeStartHrs) * 60 + (timeEndMins - timeStartMins);
};

const getIntervals = events => {
  const intervals = {};

  for (let event of events) {
    let hasInterval = false;
    for (let interval in intervals) {
      let intervalObject = intervals[interval];

      let startOfInterval = Number(intervalObject['start']);
      let endOfInterval = Number(intervalObject['end']);
      let startOfEvent = Number(event['start']);
      let endOfEvent = Number(event['end']);

      if (
        // check if event falls in the limits of any of the previously
        // generated intervals
        (startOfEvent >= startOfInterval && startOfEvent <= endOfInterval) ||
        (endOfEvent >= startOfInterval && endOfEvent <= endOfInterval) ||
        (startOfEvent >= startOfInterval &&
          startOfEvent <= endOfInterval &&
          endOfEvent >= startOfInterval &&
          endOfEvent <= endOfInterval) ||
        (startOfEvent <= startOfInterval &&
          startOfEvent <= endOfInterval &&
          endOfEvent >= startOfInterval &&
          endOfEvent >= endOfInterval)
      ) {
        intervalObject['events'].push(event);

        // if an event is found in an interval, we need to check if that event
        // further modifies the boundaries of the interval
        if (startOfEvent < startOfInterval) {
          intervalObject['start'] = startOfEvent;
        }

        if (endOfEvent > endOfInterval) {
          intervalObject['end'] = endOfEvent;
        }
        hasInterval = true;
      }
    }

    if (!hasInterval) {
      intervals[event['start']] = {
        start: event['start'],
        end: event['end'],
        events: [event],
      };
    }
  }

  console.log(intervals);
  // got the intervals ... calculate the levels
  for (let interval in intervals) {
    let intervalObject = intervals[interval];

    let levels = [[]];

    for (let event of intervalObject['events']) {
      let hasEventLevelified = false;
      if (levels[0].length === 0) {
        levels[0].push(event);
        hasEventLevelified = true;
      } else {
        for (let i = 0; i < levels.length; i++) {
          for (let level_event of levels[i]) {
            let startOfEvent = event['start'];
            let endOfEvent = event['end'];
            let startOfLevel = level_event['start'];
            let endOfLevel = level_event['end'];

            if (
              (startOfEvent >= startOfLevel && startOfEvent <= endOfLevel) ||
              (endOfEvent >= startOfLevel && endOfEvent <= endOfLevel) ||
              (startOfEvent <= startOfLevel && endOfEvent >= endOfLevel) ||
              (startOfEvent >= startOfLevel && endOfEvent <= endOfLevel)
            ) {
              // if overlaps, break and leave this level. continue to the next level
              hasEventLevelified = false;
              break;
            } else {
              // if not overlaps, continue checking other events in the same level
              hasEventLevelified = true;
            }
          }
          // If event has not overlapped with another event in the same level
          if (hasEventLevelified) {
            levels[i].push(event);
            break;
          }
        }
        if (!hasEventLevelified) {
          levels.push([event]);
        }
      }
    }
    intervalObject['levels'] = levels;
  }
  console.log(intervals);
  return intervals;
};

const Calendar = props => {
  const appCtx = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const intervals = getIntervals(appCtx.events);
  const eventsArray = [];
  const AVAILABLE_WIDTH = 620;

  for (let interval in intervals) {
    let intervalObject = intervals[interval];

    // number of levels determines the number of overlapping events
    let numberOfOverlaps = intervalObject['levels'].length;

    let widthOfEventBlock = AVAILABLE_WIDTH / numberOfOverlaps;

    let levels = intervalObject['levels'];
    for (let i = 0; i < levels.length; i++) {
      for (let event of levels[i]) {
        let eventElement = React.createElement(Event, {
          key: event['title'],
          eventName: event['title'],
          eventStart: event['start'],
          eventEnd: event['end'],
          left: i * widthOfEventBlock,
          width: widthOfEventBlock,
          top: getMinutesBetween('0900', event['start']),
          height: getMinutesBetween(event['start'], event['end']),
          color: generateRandomColor(),
        });
        eventsArray.push(eventElement);
      }
    }
  }

  console.log(eventsArray);
  return (
    <div className={styles.calendar}>
      <div data-testid="hour-column" className="flex-child hour-col">
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          10:00 am
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          11:00 am
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          9:00 am
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          12:00 pm
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          1:00 pm
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          2:00 pm
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          3:00 pm
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          4:00 pm
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          5:00 pm
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          6:00 pm
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          7:00 pm
        </div>
        <div data-testid="hour-column-div" className={styles['hour-div']}>
          8:00 pm
        </div>
      </div>
      <div>
        {eventsArray.map(event => {
          return event;
        })}
      </div>
    </div>
  );
};

export default Calendar;
