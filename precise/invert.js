const flip_sign = require("preciso/flip_sign.js");
const multiply = require("preciso/multiply.js");
const subtract = require("preciso/subtract.js");

function invert(geotransform) {
  const [a, b, c, d, e, f] = geotransform;

  const ae = multiply(a, e);
  const af = multiply(a, f);
  const bd = multiply(b, d);
  const bf = multiply(b, f);
  const cd = multiply(c, d);
  const ce = multiply(c, e);
  const g = subtract(bf, ce);
  const h = flip_sign(g);

  return [
    [subtract(cd, af), g],
    [f, g],
    [c, h],
    [subtract(bd, ae), h],
    [e, h],
    [b, g]
  ];
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return invert;
  });
}

if (typeof module === "object") {
  module.exports = invert;
  module.exports.default = invert;
}
