// @filename: CNESSubset.ts

import { CNESDatasource } from "./CNESDatasource.js";
import { Period } from "../Period.js";
import { State } from "../State.js";
import { Subset } from "../Subset.js";

export type CNESSubset = Subset & {
    src: CNESDatasource
} | {
    src: CNESDatasource,
    states: State[]
} | {
    src: CNESDatasource,
    states: State[],
    period: Period
};