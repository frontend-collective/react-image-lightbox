#!/usr/bin/env bash
#
# Move example/dist files to their spots for the example
#
# Usage: ./copy_from_example_dist.sh
BASE_DIR="$( dirname "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )")"
cp "${BASE_DIR}/example/dist/"{app.css,app.js,bundle.js,common.js,index.html} "${BASE_DIR}/"
