// @filename: SIMSubset.ts

/*
 *     Copyright 2023 Pedro Paulo Teixeira dos Santos

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import { Period } from "../Period.js"
import { SIMDatasource } from "./SIMDatasource.js"
import { State } from "../State.js"
import { Subset } from "../Subset.js"

export type SIMSubset = Subset & {
    src: SIMDatasource
} | {
    src: SIMDatasource,
    states: State[]
} | {
    src: SIMDatasource,
    states: State[],
    period: {
        start: {
            year: Period['start']['year']
        },
        end: {
            year: Period['end']['year']
        }
    }
}