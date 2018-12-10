# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.1.0"></a>
# [5.1.0](https://github.com/frontend-collective/react-image-lightbox/compare/v5.0.0...v5.1.0) (2018-12-10)


### Bug Fixes

* change focus when zoom buttons becomes disabled to be able to still use arrow keys (fix issue [#132](https://github.com/frontend-collective/react-image-lightbox/issues/132)) ([#135](https://github.com/frontend-collective/react-image-lightbox/issues/135)) ([30ba946](https://github.com/frontend-collective/react-image-lightbox/commit/30ba946))


### Features

* typescript declarations files ([#116](https://github.com/frontend-collective/react-image-lightbox/issues/116)) ([357a801](https://github.com/frontend-collective/react-image-lightbox/commit/357a801))



<a name="5.0.0"></a>

# [5.0.0](https://github.com/frontend-collective/react-image-lightbox/compare/v4.6.0...v5.0.0) (2018-04-29)

### Features

- migrated away from style-loader ([e74b7c9](https://github.com/frontend-collective/react-image-lightbox/commit/e74b7c9))

### BREAKING CHANGES

- you must import the css for the component yourself,
  using `import 'react-image-lightbox/style.css';`. You only need to do this
  once in your application.
- Versions of IE earlier than IE 11 are no longer supported.

<a name="4.6.0"></a>

# [4.6.0](https://github.com/frontend-collective/react-image-lightbox/compare/v4.5.0...v4.6.0) (2018-03-09)

### Bug Fixes

- avoid cross-origin errors from using window.top ([5bb5ac9](https://github.com/frontend-collective/react-image-lightbox/commit/5bb5ac9))

### Features

- onImageLoad API ([b08be00](https://github.com/frontend-collective/react-image-lightbox/commit/b08be00))

<a name="4.5.0"></a>

# [4.5.0](https://github.com/frontend-collective/react-image-lightbox/compare/v4.4.1...v4.5.0) (2018-01-21)

### Features

- Custom error message prop for when images fail to load ([419998d](https://github.com/frontend-collective/react-image-lightbox/commit/419998d)), closes [#82](https://github.com/frontend-collective/react-image-lightbox/issues/82)

<a name="4.4.1"></a>

## [4.4.1](https://github.com/frontend-collective/react-image-lightbox/compare/v4.4.0...v4.4.1) (2018-01-14)

### Bug Fixes

- handle environment with no navigator. Fixes [#97](https://github.com/frontend-collective/react-image-lightbox/issues/97) ([7f36b72](https://github.com/frontend-collective/react-image-lightbox/commit/7f36b72))

<a name="4.4.0"></a>

# [4.4.0](https://github.com/frontend-collective/react-image-lightbox/compare/v4.3.0...v4.4.0) (2017-12-17)

### Bug Fixes

- silence react-modal warning by setting appElement ([a26d597](https://github.com/frontend-collective/react-image-lightbox/commit/a26d597))

### Features

- allow for override of react-modal props ([45a756d](https://github.com/frontend-collective/react-image-lightbox/commit/45a756d))

<a name="4.3.0"></a>

# [4.3.0](https://github.com/frontend-collective/react-image-lightbox/compare/v4.2.2...v4.3.0) (2017-10-13)

### Bug Fixes

- Hide orange outline around viewer in Chrome on Android ([359e9bd](https://github.com/frontend-collective/react-image-lightbox/commit/359e9bd))

### Features

- Add react@16 support ([e3e63b6](https://github.com/frontend-collective/react-image-lightbox/commit/e3e63b6))

<a name="4.2.2"></a>

## [4.2.2](https://github.com/frontend-collective/react-image-lightbox/compare/v4.2.1...v4.2.2) (2017-10-05)

### Bug Fixes

- Improve rendering on zoom in Safari ([bab9ca1](https://github.com/frontend-collective/react-image-lightbox/commit/bab9ca1))

<a name="4.2.1"></a>

## [4.2.1](https://github.com/frontend-collective/react-image-lightbox/compare/v4.1.0...v4.2.1) (2017-09-07)

### Bug Fixes

- Default to null height instead of 0 ([faa996c](https://github.com/frontend-collective/react-image-lightbox/commit/faa996c))

See the GitHub [Releases](https://github.com/frontend-collective/react-image-lightbox/releases) for information on previous releases.
