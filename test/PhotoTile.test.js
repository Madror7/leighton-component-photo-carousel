/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import PhotoTile from '../client/components/PhotoTile';

describe('PhotoTile', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<PhotoTile debug />);

    expect(component).toMatchSnapshot();
  });

  it('should invoke the passed-in prop function when clicked', () => {
    const component = mount(<PhotoTile
      openModal={jest.fn()}
    />);

    const openModal = sinon.spy(component.prop('openModal'));

    component.simulate('click');
    expect(openModal).toHaveBeenCalled();
  });
});
