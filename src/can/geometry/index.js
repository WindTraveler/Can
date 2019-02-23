import Circle from './circle';
import Rect from './rect';
import Poly from './poly';
import Img from './img';
import Text from './text';
import Geometry from './geom';
import Path from './path';
import {GEOM_MAP} from "../global";

GEOM_MAP.set('circle', Circle);
GEOM_MAP.set('rect', Rect);
GEOM_MAP.set('poly', Poly);
GEOM_MAP.set('img', Img);
GEOM_MAP.set('text', Text);
GEOM_MAP.set('path', Path);

export { Circle, Rect, Poly, Img, Text, Geometry, Path};
