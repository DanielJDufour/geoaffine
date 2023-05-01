const clean = require("preciso/clean.js");
const divide = require("preciso/divide.js");
const multiply = require("preciso/multiply.js");
const floorfn = require("preciso/floor.js");
const round = require("preciso/round.js");
const sign = require("preciso/sign.js");
const sum = require("preciso/sum.js");

const invert = require("./invert.js");

function PreciseGeotransform(geotransform) {
  geotransform = geotransform.map(n => n.toString());
  const [a, b, c, d, e, f] = geotransform;
  const inverted = invert(geotransform);
  const [ai, bi, ci, di, ei, fi] = inverted;

  const forwardX = ([I, J]) => sum([a, multiply(b, I.toString()), multiply(c, J.toString())]);
  const forwardY = ([I, J]) => sum([d, multiply(e, I.toString()), multiply(f, J.toString())]);

  return {
    forwardX,
    forwardY,
    forward: function forward(IJ) {
      return [forwardX(IJ), forwardY(IJ)];
    },
    inverse: function inverse([X, Y], { digits = 100, floor = false } = {}) {
      X = X.toString();
      Y = Y.toString();
      if (floor) digits = 1;
      const opts = { max_decimal_digits: digits + 5 };
      const xsum = sum([divide(...ai, opts), divide(multiply(bi[0], X), bi[1], opts), divide(multiply(ci[0], Y), ci[1], opts)]);
      const ysum = sum([divide(...di, opts), divide(multiply(ei[0], X), ei[1], opts), divide(multiply(fi[0], Y), fi[1], opts)]);
      if (floor) {
        return [clean(floorfn(xsum)), clean(floorfn(ysum))];
      } else {
        return [clean(round(xsum, { digits })), clean(round(ysum, { digits }))];
      }
    }
  };
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return PreciseGeotransform;
  });
}

if (typeof module === "object") {
  module.exports = PreciseGeotransform;
  module.exports.default = PreciseGeotransform;
}
