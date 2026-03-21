// Monkey-patch String.repeat to prevent RangeError: Invalid count value: -2
const origRepeat = String.prototype.repeat;
String.prototype.repeat = function (count) {
    return origRepeat.call(this, Math.max(0, Math.floor(count) || 0));
};
