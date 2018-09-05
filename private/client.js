const { EventEmitter } = require('events');
const createParser = require('./parser');
const createEncoder = require('./encoder');

module.exports = function createClient(stream, opts) {
    return new Client(stream, opts);
}

class Client extends EventEmitter {
    constructor(stream, opts) {
        this._encode = createEncoder(opts);
        this._stream = stream;

        const parse = createParser({
            onMessage: (msg) => { this.emit('message', msg); },
            ...opts
        });
        
        stream.on('data', (buf) => { parse(buf); });
    }

    write(message) {
        this._stream.write(this._encode(message));
    }

    send(message, cb) {
        this.once('message', (msg) => {
            cb(null, msg);
        });
        this.write(message);
    }
}