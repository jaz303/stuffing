module.exports = function createParser({start, end, escape, xor, onMessage}) {
    let accum = null, receiveState = 0;
    return (input) => {
        for (let i = 0; i < input.length; ++i) {
            const b = input[i];
            if (b === start) {
                accum = [];
                receiveState = 1;
            } else {
                switch (receiveState) {
                    case 1:
                        if (b === escape) {
                            receiveState = 2;
                        } else if (b === end) {
                            receiveState = 0;
                            onMessage(Buffer.from(accum));
                        } else {
                            accum.push(b);
                        }
                        break;
                    case 2:
                        accum.push(b ^ xor);
                        receiveState = 1;
                        break;
                }
            }
        }
    };
};