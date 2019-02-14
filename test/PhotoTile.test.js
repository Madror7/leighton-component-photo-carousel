import React from 'react';
import { shallow } from 'enzyme';

import PhotoTile from '../client/components/PhotoTile';

describe('PhotoTile', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<PhotoTile debug />);

    expect(component).toMatchSnapshot();
  });
});
