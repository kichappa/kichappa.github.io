import { render, screen } from '@testing-library/react';
import App from './App';

// This test came with create-react-app and needs react-scripts' Jest setup and @testing-library, which the Next version does not install, so it does not run.
// This test renders App and looks for a 'learn react' link.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
