export default {
    // Min image zoom level
    MIN_ZOOM_LEVEL: 0,

    // Max image zoom level
    MAX_ZOOM_LEVEL: 300,

    // Size ratio between previous and next zoom levels
    ZOOM_RATIO: 1.007,

    // How much to increase/decrease the zoom level when the zoom buttons are clicked
    ZOOM_BUTTON_INCREMENT_SIZE: 100,

    // Used to judge the amount of horizontal scroll needed to initiate a image move
    WHEEL_MOVE_X_THRESHOLD: 200,

    // Used to judge the amount of vertical scroll needed to initiate a zoom action
    WHEEL_MOVE_Y_THRESHOLD: 1,

    KEYS: {
        ESC:         27,
        LEFT_ARROW:  37,
        RIGHT_ARROW: 39,
    },
};
