module.exports = {
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
  setupFiles: ['./test-config/shim.js', './test-config/test-setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
