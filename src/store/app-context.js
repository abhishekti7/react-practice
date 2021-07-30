import React from 'react';

const AppContext = React.createContext({
  events: [],
  setEvents: listOfEvents => {},
  eventsURL: '',
});

export default AppContext;
