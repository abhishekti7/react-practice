import React from 'react';
import { render } from '@testing-library/react';
import Calendar from '../Calendar';
import AppContext from '../../../store/app-context';

describe('tests for calendar component', () => {
  test("number of hour div's should be 12 (9 am - 9 pm) ", () => {
    const calendarComponent = render(<Calendar />);
    const hourColDiv = calendarComponent.getAllByTestId('hour-column-div');
    expect(hourColDiv.length).toBe(12);
  });

  test('testing number of event components rendered', async () => {
    const calendarComponent = render(
      <AppContext.Provider
        value={{ events: [{ title: 'A', start: '0900', end: '1100' }] }}
      >
        <Calendar />
      </AppContext.Provider>,
    );

    const events = await calendarComponent.findAllByTestId('event');
    expect(events.length).toBe(1);
  });
});
