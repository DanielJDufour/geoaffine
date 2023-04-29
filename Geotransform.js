const apply = require("./fn/apply.js");
const invert = require("./fn/invert.js");

function Geotransform(geotransform) {
  const inversion = invert(geotransform);
  return {
    forward: function forward(point) {
      return apply(geotransform, point);
    },
    inverse: function inverse(point, { round = false } = { round: false }) {
      let result = apply(inversion, point);
      if (round) result = result.map(n => Math.round(n));
      return result;
    }
  };
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return Geotransform;
  });
}

if (typeof module === "object") {
  module.exports = Geotransform;
  module.exports.default = Geotransform;
}
