const test = require('../index');
const assert = require('assert');

test([
  ['Test Name', () => {
    assert(true);
  }]
], 'Test Collection Name');
