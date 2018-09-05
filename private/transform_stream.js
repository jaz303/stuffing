const { Transform } = require('stream');
const createParser = require('./parser');

module.exports = function createTransformStream(opts) {
    return new ByteStuffedTransformStream(opts);
}

module.exports = class ByteStuffedTransformStream extends Transform {
    constructor({start, end, escape, xor}) {
        this._parser = createParser({
            start: start,
            end: end,
            escape: escape,
            xor: xor,
            onMessage: (msg) => { this.push(msg); }
        });
    }

    _transform(chunk, enc, cb) {
        this._parser(chunk);
        cb();
    }
};
