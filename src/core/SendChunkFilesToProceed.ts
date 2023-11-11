// @filename: SendChunkFilesToProceed.ts

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
import { ProcessFileInChildProcess } from "./ProcessFileInChildProcess.js"
import { JobMessage } from "./JobMessage.js";
import { DATASUSRecord } from "./DATASUSRecord.js";
import { Criteria } from "./Criteria.js";

/** The service that take chunks of jobs to be processed. */
export class SendChunkFilesToProceed<R extends DATASUSRecord> implements Service {
    private filesProcessed: number = 0;

    /** Protected constructor. */
    private constructor(readonly MAX_CONCURRENT_PROCESSES:number = 2, readonly criterias?: Criteria<R>[]) {
    }

    /**
     *  Defines the SendChunckFilesToProceed service.
     *  @param { number } MAX_CONCURRENT_PROCESSES - The maxumun concurrent child processes that can run.
     *  @returns { SendChunkFilesToProceed } 
     */
    static define(MAX_CONCURRENT_PROCESSES?:number, criterias?: Criteria<DATASUSRecord>[]) {
        return new SendChunkFilesToProceed(MAX_CONCURRENT_PROCESSES, criterias)
    }

    /**
     *  This function is only public to be tested. DO NOT USE IT BEFORE init().
     *  @param { number } qnt - The file processed index.
     *  @returns { number }
     */
    incrementFilesProcessed(qnt: number = 1) {
        this.filesProcessed = this.filesProcessed + qnt;
        return this.filesProcessed
    }

    /**
     *  Initializes the child_process cycle.
     *  @param { string[] } chunk - The chunk of files.
     *  @param { 'stdout' | 'file' } - Where to return the childs response.
     *  @param { string } jobScript - The path of the file that defines the child job.
     *  @returns { Promise<unknown> }
     */
    async init(chunk: string[] | JobMessage<R>[], output: 'stdout' | 'file' = 'file', callback?: Function, jobScript?: string) {
        return await 
            ProcessFileInChildProcess
            .define(jobScript)
            .init(
                {
                    file: chunk[this.filesProcessed] as string,
                    output,
                    criterias: this.criterias
                }, 
                callback
            )
            .finally(() => {
                this.incrementFilesProcessed()
                if(this.filesProcessed < this.MAX_CONCURRENT_PROCESSES && chunk[this.filesProcessed]) {
                    this.init(chunk, output, callback, jobScript)
                }
            return
        })
    }
}