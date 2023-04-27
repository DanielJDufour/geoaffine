import apply from "./fn/apply.js";
import invert from "./fn/invert.js";

export default function PreciseGeotransform(geotransform) {
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
