import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

let appComponent;
beforeEach(() => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    json: async () => [{ title: 'A', start: '0900', end: '1100' }],
  });
  appComponent = render(<App />);
});

describe('tests for App component', () => {
  test('check if modal opens on clicking event', async () => {
    const events = await screen.findAllByTestId('event');
    let modal = appComponent.queryByTestId('modal');
    expect(modal).toBeNull();

    fireEvent.click(events[0]);
    modal = appComponent.queryByTestId('modal');
    expect(modal).not.toBeNull();
  });

  test('check if clicking close button closes the modal', async () => {
    const events = await screen.findAllByTestId('event');
    fireEvent.click(events[0]);
    let modal = appComponent.queryByTestId('modal');

    expect(modal).not.toBeNull();

    const closeButton = appComponent.getByRole('button');
    fireEvent.click(closeButton);

    modal = appComponent.queryByTestId('modal');
    expect(modal).toBeNull();
  });
  test('check if clicking the backdrop closes the modal', async () => {
    const events = await screen.findAllByTestId('event');
    fireEvent.click(events[0]);
    let modal = appComponent.queryByTestId('modal');
    let backdrop = appComponent.queryByTestId('backdrop');
    expect(modal).not.toBeNull();
    expect(backdrop).not.toBeNull();

    fireEvent.click(backdrop);

    modal = appComponent.queryByTestId('modal');
    expect(modal).toBeNull();
  });
});
