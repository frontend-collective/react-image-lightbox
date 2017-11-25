/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';
import Modal from 'react-modal';
import Lightbox from '../index';

// Mock the loadStyles static function to avoid
// issues with a lack of styles._insertCss
Lightbox.loadStyles = jest.fn();

const commonProps = {
  mainSrc: '/fake/image/src.jpg',
  onCloseRequest: () => {},
};

describe('With Enzyme', () => {
  it('Lightbox has modal', () => {
    const wrapper = shallow(<Lightbox {...commonProps} />);
    expect(wrapper.find(Modal).length).toEqual(1);
  });
});

describe('With Snapshot Testing', () => {
  it('Lightbox renders properly"', () => {
    const wrapper = shallow(<Lightbox {...commonProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
