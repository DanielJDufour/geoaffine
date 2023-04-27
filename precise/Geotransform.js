import clean from "preciso/clean.js";
import divide from "preciso/divide.js";
import multiply from "preciso/multiply.js";
import round from "preciso/round.js";
import sum from "preciso/sum.js";

import invert from "./invert.js";

export default function PreciseGeotransform(geotransform) {
  geotransform = geotransform.map(n => n.toString());
  const [a, b, c, d, e, f] = geotransform;
  const inverted = invert(geotransform);
  const [ai, bi, ci, di, ei, fi] = inverted;
  return {
    forward: function forward([I, J]) {
      I = I.toString();
      J = J.toString();
      return [sum([a, multiply(b, I), multiply(c, J)]), sum([d, multiply(e, I), multiply(f, J)])];
    },
    inverse: function inverse([X, Y], { digits = 100 } = {}) {
      X = X.toString();
      Y = Y.toString();
      const opts = { max_decimal_digits: digits + 5 };
      const xsum = sum([divide(...ai, opts), divide(multiply(bi[0], X), bi[1], opts), divide(multiply(ci[0], Y), ci[1], opts)]);
      const ysum = sum([divide(...di, opts), divide(multiply(ei[0], X), ei[1], opts), divide(multiply(fi[0], Y), fi[1], opts)]);
      return [clean(round(xsum, { digits })), clean(round(ysum, { digits }))];
    }
  };
}
