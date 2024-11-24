import { render, screen } from '@testing-library/react';
import * as renderer from "react-test-renderer";
import App from './App';

it("Renders the App correctly", () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});