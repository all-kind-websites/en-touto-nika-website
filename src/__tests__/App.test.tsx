import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders ΕΝ ΤΟΥΤΩ ΝΙΚΑ', () => {
  render(<App />);
  const linkElement = screen.getByText(/ΕΝ ΤΟΥΤΩ ΝΙΚΑ/i);
  expect(linkElement).toBeInTheDocument();
});
