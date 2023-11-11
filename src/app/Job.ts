// @filename: Job.ts

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

import { appendFile } from "node:fs";
import { Criteria } from "../core/Criteria.js";
import { Dbc } from "../core/Dbc.js";
import { JobMessage } from "../core/JobMessage.js";

/** The main job, the guy that do the thing!. This is tested in parent classes. */
process.on('message', async (msg: JobMessage<any>) => {
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
        await dbc.forEachRecords(async(record: any) => {
            let criteriasApproved: boolean[] = [];
    
            msg.criterias?.map((criteria: Criteria<any>) => {
                
                /* if('city' in criteria) {
                    criteria = CityCriteria.set(criteria.city as string)    
                } 

                if('cid' in criteria) {
                    criteria = ConditionsCriteria.set(criteria.cid as string[])
                } */

                criteriasApproved.push(criteria.match(record))
            })
    
            if(criteriasApproved.every(criteriaResult => criteriaResult === true)) {
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

    if(msg.output === 'file') {
        appendFile('summary.json', `${ JSON.stringify(summary) }`, (error) => {
            if(error) throw error;
            console.log(`\nO Processo ${process.pid} encerrou a leitura e o resumo dos jobs é:\n - Encontrados: ${summary.founds}\n - Total: ${summary.total}\n`);
        });
    }

    // @ts-ignore
    process.exit(0)

});