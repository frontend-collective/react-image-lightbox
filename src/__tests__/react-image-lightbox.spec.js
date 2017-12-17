/* eslint-env jest */
import { mount } from 'enzyme';
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

describe('Lightbox structure', () => {
  const wrapper = mount(<Lightbox {...commonProps} />);

  it('contains react-modal', () => {
    expect(wrapper.find(Modal).length).toEqual(1);
  });

  it('does not contain prev button when no prevSrc supplied', () => {
    expect(wrapper.find('.ril-prev-button').length).toEqual(0);
  });

  it('contains prev button when prevSrc supplied', () => {
    wrapper.setProps({ prevSrc: '/my/prev/src' });
    expect(wrapper.find('.ril-prev-button').length).toEqual(1);
  });

  it('does not contain next button when no nextSrc supplied', () => {
    expect(wrapper.find('.ril-next-button').length).toEqual(0);
  });

  it('contains next button when nextSrc supplied', () => {
    wrapper.setProps({ nextSrc: '/my/next/src' });
    expect(wrapper.find('.ril-next-button').length).toEqual(1);
  });

  it('contains zoom buttons when enableZoom is true (default)', () => {
    expect(wrapper.find('.ril-zoom-out').length).toEqual(1);
    expect(wrapper.find('.ril-zoom-in').length).toEqual(1);
  });

  it('does not contain zoom buttons when enableZoom is false', () => {
    wrapper.setProps({ enableZoom: false });
    expect(wrapper.find('.ril-zoom-out').length).toEqual(0);
    expect(wrapper.find('.ril-zoom-in').length).toEqual(0);
  });

  it('does not contain a caption bar when no caption is supplied', () => {
    expect(wrapper.find('.ril-caption').length).toEqual(0);
  });

  it('contains a caption bar when a caption is supplied', () => {
    wrapper.setProps({ caption: 'My Caption' });
    expect(wrapper.find('.ril-caption').length).toEqual(0);
  });

  it('contains custom toolbar buttons when supplied', () => {
    wrapper.setProps({
      toolbarButtons: [<button className="my-test-button" />],
    });
    expect(wrapper.find('.ril-toolbar__item .my-test-button').length).toEqual(
      1
    );
  });

  it('contains image title when supplied', () => {
    wrapper.setProps({
      imageTitle: <div className="my-image-title" />,
    });

    expect(
      wrapper.find(
        '.ril-toolbar-left .ril-toolbar__item__child .my-image-title'
      ).length
    ).toEqual(1);
  });
});

describe('Events', () => {
  const mockAfterOpen = jest.fn();

  mount(<Lightbox {...commonProps} onAfterOpen={mockAfterOpen} />);

  it('Calls onAfterOpen when mounted', () => {
    expect(mockAfterOpen).toHaveBeenCalledTimes(1);
  });
});

describe('Key bindings', () => {
  const mockCloseRequest = jest.fn();
  const mockMovePrevRequest = jest.fn();
  const mockMoveNextRequest = jest.fn();

  const wrapper = mount(
    <Lightbox
      {...commonProps}
      onCloseRequest={mockCloseRequest}
      onMovePrevRequest={mockMovePrevRequest}
      onMoveNextRequest={mockMoveNextRequest}
    />
  );

  const simulateKey = keyCode => {
    // Avoid interference by key throttling
    wrapper.instance().lastKeyDownTime = new Date('1970-01-01').getTime();

    wrapper.find('.ril-outer').simulate('keyDown', { keyCode });
  };

  it('Responds to close key binding', () => {
    // Simulate ESC key press
    simulateKey(27);
    expect(mockCloseRequest).toHaveBeenCalledTimes(1);
  });

  it('Doesn\'t respond to "move to next" key binding when no next image available', () => {
    // Simulate right arrow key press
    simulateKey(39);
    expect(mockMoveNextRequest).toHaveBeenCalledTimes(0);
  });

  it('Responds to "move to next" key binding when next image available', () => {
    wrapper.setProps({ nextSrc: '/my/next/src' });

    // Simulate right arrow key press
    simulateKey(39);
    expect(mockMoveNextRequest).toHaveBeenCalledTimes(1);
  });

  it('Doesn\'t respond to "move to prev" key binding when no prev image available', () => {
    // Simulate left arrow key press
    simulateKey(37);
    expect(mockMovePrevRequest).toHaveBeenCalledTimes(0);
  });

  it('Responds to "move to prev" key binding', () => {
    wrapper.setProps({ prevSrc: '/my/prev/src' });

    // Simulate left arrow key press
    simulateKey(37);
    expect(mockMovePrevRequest).toHaveBeenCalledTimes(1);
  });
});

describe('Snapshot Testing', () => {
  it('Lightbox renders properly"', () => {
    const wrapper = mount(
      <Lightbox {...commonProps} reactModalProps={{ appElement: null }} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
