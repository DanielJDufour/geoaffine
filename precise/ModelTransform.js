const Geotransform = require("./Geotransform.js");

function PreciseModelTransform(matrix) {
  if (!matrix.length === 16) throw Error("unexpected length");

  matrix = Array.prototype.slice.call(matrix).map(n => n.toString());

  const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = matrix;

  return Geotransform([d, a, b, h, e, f]);
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return PreciseModelTransform;
  });
}

if (typeof module === "object") {
  module.exports = PreciseModelTransform;
  module.exports.default = PreciseModelTransform;
}
