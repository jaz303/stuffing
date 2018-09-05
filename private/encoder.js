module.exports = function createEncoder({start, end, escape, xor}) {
    return (buffer) => {
        let len = 2;
        for (let i = 0; i < buffer.length; ++i) {
            const b = buffer[i];
            if (b === start || b === end || b === escape) {
                len += 2;
            } else {
                len += 1;
            }
        }
        const encoded = Buffer.alloc(len);
        let wp = 0;
        encoded[wp++] = start;
        for (let i = 0; i < buffer.length; ++i) {
            const b = buffer[i];
            if (b === start || b === end || b === escape) {
                encoded[wp++] = escape;
                encoded[wp++] = b ^ xor;
            } else {
                encoded[wp++] = b;
            }
        }
        encoded[wp++] = end;
        return encoded;
    };
}