import flip_sign from "preciso/flip_sign.js";
import multiply from "preciso/multiply.js";
import subtract from "preciso/subtract.js";

export default function invert(geotransform) {
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
