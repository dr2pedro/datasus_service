// @filename: GenericDATASUSService.ts

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

// Acho que isso abstrai pra uma classe abstrata que vc só configura o tipo de gateway. 
// O próprio Gateway abstrai com uma interface Generic que implementa os tipos de Documento.
// O chunks to proceed precisa receber na definição os critérios que vai passar pro
// ProcessFileInChildProcess que vai enviar via child.send() o nome do arquivo
// os filtros e o tipo de saída.

import { SplitIntoChunks } from "../core/SplitInChunks.js";
import { SendChunkFilesToProceed } from "../core/SendChunkFilesToProceed.js";
import { Service } from "../core/Service.js";
import { DATASUSGateway } from "./DATASUSGateway.js";
import { Subset } from "./Subset.js";
import { Criteria } from "../core/Criteria.js";
import { DATASUSRecord } from "../core/DATASUSRecord.js";

/** Is the application service of SIASUS data source. */
export class GenericDATASUSService<
    S extends Subset,
    G extends DATASUSGateway<S>
> implements Service {
    /** Name of the files that should be dowloaded from siasus datasource. */
    private _files: string[] = [];
    /**  Chunks of files to be downloaded. */
    private _chunks: string[][] = [[]];

    /**
     *  Returns the files to be downloaded with from SIASUS datasource.
     */
    get files() {
        return this._files
    }

    /**
     *  Get the chunks of files splited in MAX_CONCURRENT_PROCESSES.
     */
    get chunks() {
        return this._chunks
    }
    
    constructor(private gateway: G, readonly MAX_CONCURRENT_PROCESSES = 2) {
    }

    /**
     *  Returns the SIASUS service.
     *  @param { DATASUSGateway<Subset> } gateway - The Gateway that returns the data from DataSUS datasource.
     *  @param { number } MAX_CONCURRENT_PROCESSES - The maximum concurrent processes.
     *  @returns { SIASUS }
     */
    static init(gateway: DATASUSGateway<Subset>, MAX_CONCURRENT_PROCESSES?: number) {
        return new GenericDATASUSService(gateway, MAX_CONCURRENT_PROCESSES)
    }

    /**
     *  Subsets the SIASUS datasource.
     *  @param { S } subset - The subset params that splits the datasource.
     *  @returns { void }
     */
    async subset(subset: S) {
        this._files = await this.gateway.list(subset, 'short') as string[];
        this._files = Array.from(new Set(this._files));
        this._chunks = SplitIntoChunks.define(this.MAX_CONCURRENT_PROCESSES).exec(this._files) as string[][];
    }

    /**
     *  Executes the process of files in childs.
     *  @param { Function | undefined } callback - The callback function to be executed in the main process when it receives msg from child.
     *  @param { string } jobScript - The path to the jobfile of the child_process.
     *  @returns { Promise<void> }
     */
    async exec(output: 'stdout' | 'file' = 'stdout', criterias?: Criteria<DATASUSRecord>[], callback?: Function, jobScript?: string) {
        for await (let file of this._files) {
            if(output === 'file') console.log(`Downloading ${file}...`)
            await this.gateway.get(file)
            if(output === 'file') console.log(`Download of ${file} completed.`)
        }

        let chunksProceeded = 0;
        if(output === 'file') console.log(`\nSending Jobs.\n`);
        while (chunksProceeded < this._chunks.length) {
            await SendChunkFilesToProceed.define(this.MAX_CONCURRENT_PROCESSES, criterias).init(this._chunks[chunksProceeded], output, callback, jobScript).finally(() => {
                chunksProceeded = chunksProceeded + 1
            })
        }

        if(chunksProceeded == this._chunks.length) {
            this._files = [];
            this._chunks = [];    
        }
        
        return
    }
}