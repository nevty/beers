import { render, screen } from '@testing-library/react';
import App from './App';

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()})

describe('Counter Testing', ()=>{
  test('renders the title of counter', () => {
    const wrapper = shallow(<App/>)
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
})


