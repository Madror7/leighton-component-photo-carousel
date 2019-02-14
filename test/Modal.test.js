import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../client/components/Modal';

describe('Modal', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Modal details={{}} debug />);

    expect(component).toMatchSnapshot();
  });
});
