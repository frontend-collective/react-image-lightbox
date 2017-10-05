// Min image zoom level
export const MIN_ZOOM_LEVEL = 0;

// Max image zoom level
export const MAX_ZOOM_LEVEL = 300;

// Size ratio between previous and next zoom levels
export const ZOOM_RATIO = 1.007;

// How much to increase/decrease the zoom level when the zoom buttons are clicked
export const ZOOM_BUTTON_INCREMENT_SIZE = 100;

// Used to judge the amount of horizontal scroll needed to initiate a image move
export const WHEEL_MOVE_X_THRESHOLD = 200;

// Used to judge the amount of vertical scroll needed to initiate a zoom action
export const WHEEL_MOVE_Y_THRESHOLD = 1;

export const KEYS = {
  ESC: 27,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
};

// Actions
export const ACTION_NONE = 0;
export const ACTION_MOVE = 1;
export const ACTION_SWIPE = 2;
export const ACTION_PINCH = 3;
export const ACTION_ROTATE = 4;

// Events source
export const SOURCE_ANY = 0;
export const SOURCE_MOUSE = 1;
export const SOURCE_TOUCH = 2;
export const SOURCE_POINTER = 3;

// Minimal swipe distance
export const MIN_SWIPE_DISTANCE = 200;
