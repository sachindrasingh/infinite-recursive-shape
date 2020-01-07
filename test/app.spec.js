const assert = require('assert');
const draw = require('./../src/draw.js').draw;
const testJson = require('./test_data.json');

describe('#draw()', function() {
    for (let i = 0; i < testJson.length; i++) {
        const testCase = testJson[i];
        const arg = testCase.input.split(",");
        const width = parseInt(arg[0]);
        const height = parseInt(arg[1])
        const padding = parseInt(arg[2]);
        const outPut = draw(width, height, padding);
        it('Test case ' + (i + 1) + ' with input ' + testCase.input, function() {
            assert.equal(JSON.stringify(outPut), testCase.pixelArrayJson);
        });
    }
});