import Geotransform from "./Geotransform.js";

export default function PreciseModelTransform(matrix) {
  if (!matrix.length === 16) throw Error("unexpected length");

  matrix = Array.prototype.slice.call(matrix).map(n => n.toString());

  const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = matrix;

  return Geotransform([d, a, b, h, e, f]);
}
