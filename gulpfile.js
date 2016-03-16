var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {
    component: {
        name: 'ReactImageLightbox',
        dependencies: [
            'react',
            'react-dom',
            'radium',
        ],
    },

    example: {
        src: 'example/src',
        dist: 'example/dist',
        files: [
            'index.html',
            'standalone.html',
            'svg/*',
            'images/*',
        ],
        scripts: [
            'app.js',
        ],
        less: [
            'stylesheets/app.less',
        ]
    }
};

initGulpTasks(gulp, taskConfig);
