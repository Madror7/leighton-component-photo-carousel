/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Modal from '../client/components/Modal';

describe('Modal', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Modal details={{}} debug />);

    expect(component).toMatchSnapshot();
  });

  it('navigates buttons correctly', () => {
    const component = mount(<Modal
      details={{}}
      display="flex"
      link="https://s3-us-west-1.amazonaws.com/xillow-talk-photos/property_photos/sample45.jpg"
      btnBack={jest.fn()}
      btnNext={jest.fn()}
    />);

    const btnBack = sinon.spy(component.prop('btnBack'));
    const btnNext = sinon.spy(component.prop('btnNext'));

    component.find('#back > i').simulate('click');
    expect(btnBack).toHaveBeenCalled();

    component.find('#forward > i').simulate('click');
    expect(btnNext).toHaveBeenCalled();
  });
});
