const { Transform } = require('stream');
const createParser = require('./parser');

module.exports = function createTransformStream(opts) {
    return new ByteStuffedTransformStream(opts);
}

class ByteStuffedTransformStream extends Transform {
    constructor(opts) {
        this._parser = createParser({
            onMessage: (msg) => { this.push(msg); },
            ...opts
        });
    }

    _transform(chunk, enc, cb) {
        this._parser(chunk);
        cb();
    }
};
