// @filename: ProcessFileInWorkerJob.ts

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

import { ChildProcess, Serializable, fork } from "node:child_process";
import { Service } from "./Service.js";
import { JobMessage } from "./JobMessage.js";
import { DATASUSRecord } from "./DATASUSRecord.js";

/** This service process some job opening child_process. */
export class ProcessFileInChildProcess<R extends DATASUSRecord> implements Service {
    
    /** Protected constructor. */
    private constructor(private jobScript: string = './dist/app/FakeJob.js') {
    }

    /**
     *  Define some job to be processed in child_processes.
     *  @param { string } jobScript - The path of the file that is coded the job to be processed in the child_process.
     *  @returns { void }
     */
    static define(jobScript?: string) {
        return new ProcessFileInChildProcess(jobScript)
    }

    /**
     *  This starts the job in one child_process.
     *  @param { JobMessage<R> | string } jobMsg - All data thar should be passed to child_process.
     *  @returns { Promise<unknown> }
     */
    async init(jobMsg: JobMessage<DATASUSRecord>, callback?: Function) {
        return new Promise((resolve, reject) => {
            const child: ChildProcess = fork(this.jobScript);
            child.on('exit', (code, signal) => {
                if (signal) {
                    reject(`Foi fechado pelo sinal: ${signal} com o código ${code}`)
                }
                resolve(true)
            });

            if(callback) {
                child.on('message', (msg: Serializable) => {
                    callback(msg)
                });
            }
            child.send(jobMsg!)
        })
    }
}
