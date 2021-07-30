import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

describe('tests for footer component', () => {
  test('footer text test', () => {
    const footer = render(<Footer />);
    const footerText = footer.getByTestId('footer');
    expect(footerText.textContent).toBe('Made with ☕');
  });
});
