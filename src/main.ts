// @filename: main.ts

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

import { MongoDBCollection, database } from "@codeplaydata/adapters";
import { ICD10 } from "./app/ICD10.js";
import { BasicFTPClient } from "./interface/BasicFTPClient.js";
import { readFileSync } from "node:fs";
import { SIHFTPGateway } from "./interface/SIH/SIHFTPGateway.js";
import { SIH } from "./app/SIH/SIH.js";
import { AIHSIHManyPrimaryConditionsCriteria } from "./interface/SIH/filter/SIHManyPrimaryDiseaseCriteria.js";
import { AIHSIHSingleCityCriteria } from "./interface/SIH/filter/SIHSingleCityCriteria.js";
import { SIAFTPGateway } from "./interface/SIA/SIAFTPGateway.js";
import { SIA } from "./app/SIA/SIA.js";
import { BPASIAManyPrimaryConditionsCriteria } from "./interface/SIA/filter/SIAManyPrimaryDiseaseCriteria.js";
import { BPASIASingleCityCriteria } from "./interface/SIA/filter/SIASingleCityCriteria.js";
import { BPASIAManyOriginDocumentCriteria } from "./interface/SIA/filter/SIAManyOriginDocumentCriteria.js";
import { SINANFTPGateway } from "./interface/SINAN/SINANFTPGateway.js";
import { SINAN } from "./app/SINAN/SINAN.js";
import { SINANDatasource } from "./app/SINAN/SINANDatasource.js";
import { NotificationSINANManyPrimaryConditionsCriteria } from "./interface/SINAN/filter/SINANManyPrimaryDiseaseCriteria.js";
import { NotificationSINANSingleCityCriteria } from "./interface/SINAN/filter/SINANSingleCityCriteria.js";
import { SIM } from "./app/SIM/SIM.js";
import { SIMFTPGateway } from "./interface/SIM/SIMFTPGateway.js";
import { DOSIMManyPrimaryConditionsCriteria } from "./interface/SIM/filter/SIMManyPrimaryDiseaseCriteria.js";
import { BPASIAManyCitiesCriteria } from "./interface/SIA/filter/SIAManyCityCriteria.js";
import { AIHSIHManyCitiesCriteria } from "./interface/SIH/filter/SIHManyCityCriteria.js";
import { DOSIMManyCitiesCriteria } from "./interface/SIM/filter/SIMManyCitiesCriteria.js";

const ftp = await BasicFTPClient.connect('ftp.datasus.gov.br');
const cid = await ICD10.load();
cid
    .block('I')
    .block('F')
    .block('C', { start: '00', end: '979'})
    .block('J', { start: '30', end: '989'})
    .block('E', { start: '10', end: '149'})

const citiesJson = readFileSync('./assets/gd_cities.json');
const cities = JSON.parse(citiesJson.toString());

/* 
siasus: {
    const storage = database.document.mongo('mongodb://localhost:27017/', 'siasus', 'dcnt');
    const insert = async (record: any) => await storage.collection.insertOne(record);
    const gateway = await SIAFTPGateway.getInstanceOf(ftp!);
    const sia = SIA.init(gateway, 3);
    await sia.subset({
        src: 'PA',
        states: ['RJ', 'ES', 'MG', 'SP'],
        period: {
            start: {
                year: 2020,
                month: '01'
            },
            end: {
                year: 2022,
                month: '12'
            }
        }
    });

    const conditionFilter = BPASIAManyPrimaryConditionsCriteria.set(cid.list);
    const cityFilter = BPASIAManyCitiesCriteria.set(cities);
    const docOrigin = BPASIAManyOriginDocumentCriteria.set(['C', 'I']);

    sia.exec('file', [conditionFilter, cityFilter, docOrigin], insert, './dist/app/SIA/SIAJob.js')
}
*/

/* 
sihsus: {
    const storage = database.document.mongo('mongodb://localhost:27017/', 'sihsus', 'dcnt');
    const insert = async (record: any) => await storage.collection.insertOne(record);
    const gateway = await SIHFTPGateway.getInstanceOf(ftp!);
    const sih = SIH.init(gateway, 5);

    await sih.subset({
        src: "RD",
        states: ['RJ', 'ES', 'MG', 'SP'],
        period: {
            start: {
                year: 2008,
                month: '01'
            },
            end: {
                year: 2022,
                month: '12'
            }
        }
    })
    
    const conditionFilter = AIHSIHManyPrimaryConditionsCriteria.set(cid.list);
    const cityFilter = AIHSIHManyCitiesCriteria.set(cities);

    sih.exec('file', [conditionFilter, cityFilter], insert, './dist/app/SIH/SIHJob.js')
}
*/


sim: {
    const storage = database.document.mongo('mongodb://localhost:27017/', 'sim', 'dcnt');
    const insert = async (record: any) => await storage.collection.insertOne(record);
    const gateway = await SIMFTPGateway.getInstanceOf(ftp!);
    const sim = SIM.init(gateway, 5);
    
    await sim.subset({
        src: 'DO',
        states: ['RJ', 'ES', 'MG', 'SP'],
        period: {
            start: {
                year: 2008
            },
            end: {
                year: 2022
            }
        }
    })

    const conditionFilter = DOSIMManyPrimaryConditionsCriteria.set(cid.list);
    const cityFilter = DOSIMManyCitiesCriteria.set(cities)
    
    sim.exec('file', [conditionFilter, cityFilter], insert, './dist/app/SIM/SIMJob.js')
}