export default function invert(geotransform) {
  const [a, b, c, d, e, f] = geotransform;
  const g = b * f - c * e;
  const h = -1 * g;
  return [(c * d - a * f) / g, f / g, c / h, (b * d - a * e) / h, e / h, b / g];
}
