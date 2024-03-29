import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'App';

test('renders About link', () => {
  render(<App />);
  
  const linkElement = screen.getByText(/About/i);
  expect(linkElement).toBeInTheDocument();
});
