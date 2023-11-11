// @filename: SIMJob.ts

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

import { Dbc } from "../../core/Dbc.js";
import { Criteria } from "../../core/Criteria.js";
import { appendFileSync, appendFile } from "node:fs";
import { JobMessage } from "../../core/JobMessage.js";
import { DO } from "./DO.js";
import { deserializeSIMCriteria } from "./deserializeSIMCriterias.js";


/** The main job, the guy that do the thing!. This is tested in parent classes. */
process.on('message', async (msg: JobMessage<DO>) => {
    if(msg.output === 'file') {
        console.log(`O processo ${ process.pid } iniciou o processamento do arquivo ${ msg.file }.`);
    }

    const dbc = await Dbc.load('./' + msg.file);
    const summary = {
        pid: process.pid,
        file: msg.file,
        total: dbc.size,
        founds: 0,
        errors: 0
    };

    if(msg.criterias) {
        await dbc.forEachRecords(async(record: DO) => {
            let criterias: Criteria<DO>[] = [];
            
            // Dealing with the serialization.
            msg.criterias?.map((criteria: Criteria<DO>) => {
                criteria = deserializeSIMCriteria(criteria)!
                criterias.push(criteria)
            });

            if(criterias.every(criteria => criteria.match(record))) {
                switch (msg.output) {
                    case 'stdout':
                        console.log(JSON.stringify(record))
                        break;
                    case 'file': 
                        appendFile('data.json', `${ JSON.stringify(record) }`, (error) => {
                            if(error) {
                                summary.errors++;
                            }
                            summary.founds++
                            // @ts-ignore
                            process.send(record)
                        });
                        break;
                    default:
                        break;
                }
                return
            }
        })
    } else {
        await dbc.forEachRecords(async(record: any) => {
            switch (msg.output) {
                case 'stdout':
                    console.log(JSON.stringify(record))
                    break;
                case 'file': 
                    appendFile('data.json', `${ JSON.stringify(record) }`, (error) => {
                        if(error) {
                            summary.errors++;
                        }
                        summary.founds++
                        // @ts-ignore
                        process.send(record)
                    });
                    break;
                default:
                    break;
            }
            return
        })
    }

    appendFileSync(`${msg.file}.json`, JSON.stringify(summary));
    console.log(`\nO Processo ${process.pid} encerrou a leitura e o resumo dos jobs é:\n - Encontrados: ${summary.founds}\n - Total: ${summary.total}\n`);
    dbc.remove();
    // @ts-ignore
    process.exit(0)
});