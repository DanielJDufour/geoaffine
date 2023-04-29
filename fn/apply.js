function transform(geotransform, point) {
  const [a, b, c, d, e, f] = geotransform;
  const [x, y] = point;
  return [a + b * x + c * y, d + e * x + f * y];
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return transform;
  });
}

if (typeof module === "object") {
  module.exports = transform;
  module.exports.default = transform;
}
