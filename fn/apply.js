export default function transform(geotransform, point) {
  const [a, b, c, d, e, f] = geotransform;
  const [x, y] = point;
  return [a + b * x + c * y, d + e * x + f * y];
}
