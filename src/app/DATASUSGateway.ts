// @filename: DATASUSGateway.ts

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

import { Subset } from "./Subset.js";

/** The Gateway that contains the DataSUS data to be pulled. */
export interface DATASUSGateway<S extends Subset> {
    /**
     *  List all files avaiable in the Gateway to get.
     *  @param { any } subset - The params that defines the subset of datasus datasource.
     *  @param { 'short' | 'full' } display - The forat of the files metadata that is returned by the gateway. If short only returns the names.
     *  @returns { Promise<string> | Promise<{ [key: string]: any }[]> }
     * 
     */
    list(subset: S, display: 'short' | 'full'): Promise<string[]> | Promise<{ [key: string]: any }[]>

    /**
     *  Get files in the Gateway.
     *  @param { string } fileName - The file name.
     *  @returns { Promise<any> }
     */
    get(file: string, dest?: string): Promise<any>
}
