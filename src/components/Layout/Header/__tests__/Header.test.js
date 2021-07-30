import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';

describe('Header tests', () => {
  test('logo text for header', () => {
    const header = render(<Header />);
    const headerText = header.getByTestId('header-text');
    expect(headerText.textContent).toBe('Welcome');
  });
});
