import { bresenham } from "./bresenham.js";
import { dda } from "./dda.js";
import { LinePointSlope } from "./linePointSlope.js";

export const algorithms = {
    "dda": dda,
    "bresenham": bresenham,
    "linePointSlope": LinePointSlope
}