const Geotransform = require("./Geotransform.js");

function ModelTransform(matrix) {
  if (!matrix.length === 16) throw Error("unexpected length");

  const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = matrix;

  return Geotransform([d, a, b, h, e, f]);
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return ModelTransform;
  });
}

if (typeof module === "object") {
  module.exports = ModelTransform;
  module.exports.default = ModelTransform;
}
