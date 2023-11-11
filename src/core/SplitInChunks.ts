// @filename: SplitIntoChunks.ts

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

import { Service } from "./Service.js";

/** Just an utility service that split a Array in chunks of it. */
export class SplitIntoChunks implements Service {
    
    /** Protected constructor. */
    private constructor(protected chunkSize: number) {
    }

    /**
     *  Defines the service that split an array in chunks.
     *  @param { number } chunkSize 
     *  @returns { SplitIntoChunks }
     */
    static define(chunkSize: number) {
        return new SplitIntoChunks(chunkSize)
    }

    /**
     *  Splits the array.
     *  @param { Array } arr - The array to be splited.
     *  @returns { Array }
     */
    exec(arr: any[]) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += this.chunkSize) {
            chunks.push(arr.slice(i, i + this.chunkSize));
        }
        return chunks
    }
}
