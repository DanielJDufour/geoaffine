# geoaffine
> GeoSpatial Affine Transformations for Humans

## install
```bash
npm install geoaffine
```

## basic usage
This library supports [Geotransforms](https://gdal.org/tutorials/geotransforms_tut.html).
```js
// or import Geotransform from "geoaffine/Geotransform.js";
import { Geotransform } from "geoaffine";

const geotransform = [337934.4836350695, -0.14299987236417117, -0.5767759114507439, 7840518.464866471, -0.5767759114507457, 0.14299987236414916];

const { forward, inverse } = Geotransform(geotransform);

// convert pixel at origin (top-left corner) to coordinates in spatial reference system 
forward([0, 0]);
[337934.4836350695, 7840518.464866471]

// convert point 200 pixels right and 100 pixels down
forward([200, 100]);
[337862.50605668797, 7840475.087262562]

// reverse above
inverse([337862.50605668797, 7840475.087262562], { floor: true })
[100, 100]
```

## advanced usage
### ModelTransform
GeoTIFF [ModelTransformationTag](https://www.awaresystems.be/imaging/tiff/tifftags/modeltransformationtag.html) defines a 4x4 matrix of 16 parameters.
```js
// or import ModelTransform from "geoaffine/ModelTransform.js";
import { ModelTransform } from "geoaffine";

const matrix = [
  -0.14299987236417117, -0.5767759114507439,  0,   337934.4836350695,
  -0.5767759114507457,  0.14299987236414916,  0,   7840518.464866471,
  0,                    0,                    0,   0,
  0,                    0,                    0,   1
];

const { forward, inverse } = ModelTransform(matrix);

forward([2000, 2000]);
[336494.93206743966, 7839650.912788298]

inverse([336780.9318121680122, 7840804.46461119929832], { floor: true })
[0, 2000]
```

### arbitrary precision
In order to avoid floating point arithmetic issues, you can use PreciseGeotransform and PreciseModelTransform,
which use [preciso](https://github.com/danieljdufour/preciso) for mathematical calculations.
```js
// or import PreciseGeotransform from "geoaffine/precise/Geotransform.js";
import { PreciseGeotransform } from "geoaffine";

// or import PreciseModelTransform from "geoaffine/precise/ModelTransform.js";
import { PreciseModelTransform } from "geoaffine";

const geotransform = [337934.4836350695, -0.14299987236417117, -0.5767759114507439, 7840518.464866471, -0.5767759114507457, 0.14299987236414916];

const { forward, inverse } = PreciseGeotransform(geotransform);

forward([33.125, 67.825])
const xy = ["337890.62693810329012497625", "7840509.0581307472924654645"]

inverse(xy)
["33.125", "67.825"]

inverse(xy, { floor: true })
["33", "67"]
```


## References:
- https://gdal.org/tutorials/geotransforms_tut.html
- https://en.wikipedia.org/wiki/World_file
