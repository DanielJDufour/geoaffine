import Geotransform from "./Geotransform.js";

export default function ModelTransform(matrix) {
  if (!matrix.length === 16) throw Error("unexpected length");

  const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = matrix;

  return Geotransform([d, a, b, h, e, f]);
}
