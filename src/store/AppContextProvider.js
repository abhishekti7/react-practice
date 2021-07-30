import React, { useState } from 'react';
import AppContext from './app-context';

const AppContextProvider = props => {
  const [events, setEvents] = useState([]);

  const setEventsHandler = listOfEvents => {
    setEvents(listOfEvents);
  };

  const defaultContextValue = {
    events: events,
    setEvents: setEventsHandler,
    eventsURL:
      'https://recruiter-static-content.s3.ap-south-1.amazonaws.com/json_responses_for_tests/test.json',
  };

  return (
    <AppContext.Provider value={defaultContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
