import { mount } from 'enzyme';
import React from 'react';
import Modal from 'react-modal';
import Lightbox from '../index';
import { translate, getHighestSafeWindowContext } from '../util';
import {
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  ZOOM_BUTTON_INCREMENT_SIZE,
} from '../constant';

// Mock the loadStyles static function to avoid
// issues with a lack of styles._insertCss
Lightbox.loadStyles = jest.fn();

const commonProps = {
  mainSrc: '/fake/image/src.jpg',
  onCloseRequest: () => {},
};

const extendedCommonProps = {
  ...commonProps,
  prevSrc: '/fake/image/src1.jpg',
  nextSrc: '/fake/image/src2.jpg',
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
      toolbarButtons: [<button type="button" className="my-test-button" />],
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
  const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
  const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';
  let originalImageSrcProto;
  beforeAll(() => {
    originalImageSrcProto = Object.getOwnPropertyDescriptor(
      global.Image.prototype,
      'src'
    );

    Object.defineProperty(global.Image.prototype, 'src', {
      set(src) {
        if (src === LOAD_FAILURE_SRC) {
          setTimeout(() => this.onerror(new Error('mock error')));
        } else if (src === LOAD_SUCCESS_SRC) {
          setTimeout(this.onload);
        }
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(global.Image.prototype, 'src', originalImageSrcProto);
  });

  const mockFns = {
    onAfterOpen: jest.fn(),
    onCloseRequest: jest.fn(),
    onMovePrevRequest: jest.fn(),
    onMoveNextRequest: jest.fn(),
    onImageLoad: jest.fn(),
    onImageLoadError: jest.fn(),
  };

  const wrapper = mount(
    <Lightbox {...extendedCommonProps} {...mockFns} animationDisabled />
  );

  // Spy zoomBtn focus
  const { zoomOutBtn, zoomInBtn } = wrapper.instance();
  jest.spyOn(zoomOutBtn.current, 'focus');
  jest.spyOn(zoomInBtn.current, 'focus');

  it('Calls onAfterOpen when mounted', () => {
    expect(mockFns.onAfterOpen).toHaveBeenCalledTimes(1);
    expect(mockFns.onAfterOpen).toHaveBeenCalledWith();
  });

  it('Calls onMovePrevRequest when left button clicked', () => {
    expect(mockFns.onMovePrevRequest).toHaveBeenCalledTimes(0);
    wrapper.find('.ril-prev-button').simulate('click');
    expect(mockFns.onMovePrevRequest).toHaveBeenCalledTimes(1);
    expect(mockFns.onMovePrevRequest).not.toHaveBeenCalledWith();
  });

  it('Calls onMoveNextRequest when right button clicked', () => {
    expect(mockFns.onMoveNextRequest).toHaveBeenCalledTimes(0);
    wrapper.find('.ril-next-button').simulate('click');
    expect(mockFns.onMoveNextRequest).toHaveBeenCalledTimes(1);
    expect(mockFns.onMoveNextRequest).not.toHaveBeenCalledWith();
  });

  it('Calls onCloseRequest when close button clicked', () => {
    expect(mockFns.onCloseRequest).toHaveBeenCalledTimes(0);
    wrapper.find('.ril-close').simulate('click');
    expect(mockFns.onCloseRequest).toHaveBeenCalledTimes(1);
    expect(mockFns.onCloseRequest).not.toHaveBeenCalledWith();
  });

  it('Calls onImageLoad when image loaded', done => {
    mockFns.onImageLoad.mockImplementationOnce((imageSrc, srcType, image) => {
      expect(imageSrc).toEqual(LOAD_SUCCESS_SRC);
      expect(srcType).toEqual('mainSrc');
      expect(image).toBeInstanceOf(global.Image);
      done();
    });

    expect(mockFns.onImageLoad).toHaveBeenCalledTimes(0);
    wrapper.setProps({ mainSrc: LOAD_SUCCESS_SRC });
  });

  it('Calls onImageLoadError when image loaded', done => {
    mockFns.onImageLoadError.mockImplementationOnce(
      (imageSrc, srcType, image) => {
        expect(imageSrc).toEqual(LOAD_FAILURE_SRC);
        expect(srcType).toEqual('mainSrc');
        expect(image).toBeInstanceOf(Error);
        done();
      }
    );

    expect(mockFns.onImageLoadError).toHaveBeenCalledTimes(0);
    wrapper.setProps({ mainSrc: LOAD_FAILURE_SRC });
  });

  it('Calls the the ZoomIn Focus when ZoomOut is disabled', () => {
    wrapper.setState({
      zoomLevel: MIN_ZOOM_LEVEL + ZOOM_BUTTON_INCREMENT_SIZE,
    });
    wrapper.instance().handleZoomOutButtonClick();
    expect(zoomInBtn.current.focus).toHaveBeenCalledTimes(1);
  });

  it('Calls the the ZoomOut Focus when ZoomIn is disabled', () => {
    wrapper.setState({
      zoomLevel: MAX_ZOOM_LEVEL - ZOOM_BUTTON_INCREMENT_SIZE,
    });
    wrapper.instance().handleZoomInButtonClick();
    expect(zoomOutBtn.current.focus).toHaveBeenCalledTimes(1);
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
    expect(mockCloseRequest).toHaveBeenCalledTimes(0);
    // Simulate ESC key press
    simulateKey(27);
    expect(mockCloseRequest).toHaveBeenCalledTimes(1);
  });

  it('Doesn\'t respond to "move to next" key binding when no next image available', () => {
    // Simulate right arrow key press
    simulateKey(39);
    expect(mockMoveNextRequest).toHaveBeenCalledTimes(0);
  });

  it('Responds to "move to next" key binding when next custom content available', () => {
    wrapper.setProps({ nextSrc: null, nextCustomContent: <div>next content</div> });

    // Simulate right arrow key press
    simulateKey(39);
    expect(mockMoveNextRequest).toHaveBeenCalledTimes(1);
  });

  it('Responds to "move to next" key binding when next image available', () => {
    wrapper.setProps({ nextSrc: '/my/next/src', nextCustomContent: null });

    // Simulate right arrow key press
    simulateKey(39);
    expect(mockMoveNextRequest).toHaveBeenCalledTimes(2);
  });

  it('Doesn\'t respond to "move to prev" key binding when no prev image available', () => {
    // Simulate left arrow key press
    simulateKey(37);
    expect(mockMovePrevRequest).toHaveBeenCalledTimes(0);
  });

  it('Responds to "move to prev" key binding with custom content', () => {
    wrapper.setProps({ prevSrc: null, prevCustomContent: <div>previous content</div> });

    // Simulate left arrow key press
    simulateKey(37);
    expect(mockMovePrevRequest).toHaveBeenCalledTimes(1);
  });

  it('Responds to "move to prev" key binding', () => {
    wrapper.setProps({ prevSrc: '/my/prev/src', prevCustomContent: null });

    // Simulate left arrow key press
    simulateKey(37);
    expect(mockMovePrevRequest).toHaveBeenCalledTimes(2);
  });
});

describe('Snapshot Testing', () => {
  it('Lightbox renders properly"', () => {
    const wrapper = mount(
      <Lightbox
        {...commonProps}
        reactModalProps={{ appElement: global.document.createElement('div') }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Lightbox renders properly with customContent', () => {
    const wrapper = mount(
      <Lightbox
        mainCustomContent={<div>testing</div>}
        prevCustomContent={<span>could be anything</span>}
        nextCustomContent={<h1>next component</h1>}
        onCloseRequest={() => {}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Error Testing', () => {
  it('Should render the default error message', () => {
    const wrapper = mount(<Lightbox {...commonProps} />);
    wrapper.setState({
      loadErrorStatus: { mainSrc: true },
    });
    wrapper.update();
    expect(wrapper.find('div.ril__errorContainer')).toHaveText(
      'This image failed to load'
    );
  });
  it('Should render the specified error message', () => {
    const wrapper = mount(<Lightbox {...commonProps} />);
    const imageLoadErrorMessage = <p>Specified Error Message</p>;
    wrapper.setState({
      loadErrorStatus: { mainSrc: true },
    });
    wrapper.setProps({
      imageLoadErrorMessage,
    });
    wrapper.update();
    expect(wrapper.find('div.ril__errorContainer')).toContainReact(
      imageLoadErrorMessage
    );
  });
});

describe('Utils', () => {
  it('translate function return empty string if str param is not passed', () => {
    expect(translate()).toBe('');
  });
  it('getHighestSafeWindowContext function if parent is the same origin', () => {
    const self = {
      location: { href: 'http://test.test' },
      document: { referrer: 'http://test.test' },
    };
    expect(getHighestSafeWindowContext(self)).toBe(global.window.top);
  });
  it('getHighestSafeWindowContext function if parent is a different origin', () => {
    const self = {
      location: { href: 'http://test1.test' },
      document: { referrer: 'http://test.test' },
    };
    expect(getHighestSafeWindowContext(self)).toBe(self);
  });
});
