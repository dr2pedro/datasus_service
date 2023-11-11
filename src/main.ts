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

const ftp = await BasicFTPClient.connect('ftp.datasus.gov.br');
const cid = await ICD10.load();
cid.block('T', { start: '36', end: '509'});
const city = '330455';

/* 
sihsus: {
    const storage = database.document.mongo('mongodb://localhost:27017/', 'sihsus', 'iexo');
    const insert = async (record: any) => {
        await storage.collection.insertOne(record);
    };
    const gateway = await SIHFTPGateway.getInstanceOf(ftp!);
    const sih = SIH.init(gateway, 5);

    await sih.subset({
        src: "RD",
        states: ['RJ'],
        period: {
            start: {
                year: 2020,
                month: '01'
            },
            end: {
                year: 2021,
                month: '12'
            }
        }
    })
    
    const conditionFilter = AIHSIHManyPrimaryConditionsCriteria.set(cid.list);
    const cityFilter = AIHSIHSingleCityCriteria.set(city);

    sih.exec('file', [conditionFilter, cityFilter], insert, './dist/app/SIH/SIHJob.js')
}
*/
/* 
siasus: {
    const storage = database.document.mongo('mongodb://localhost:27017/', 'siasus', 'iexo');
    const insert = async (record: any) => {
        await storage.collection.insertOne(record);
    };
    const gateway = await SIAFTPGateway.getInstanceOf(ftp!);
    const sia = SIA.init(gateway, 5);
    await sia.subset({
        src: 'PA',
        states: ['RJ'],
        period: {
            start: {
                year: 2020,
                month: '01'
            },
            end: {
                year: 2021,
                month: '12'
            }
        }
    });

    const conditionFilter = BPASIAManyPrimaryConditionsCriteria.set(cid.list);
    const cityFilter = BPASIASingleCityCriteria.set(city);
    const docOrigin = BPASIAManyOriginDocumentCriteria.set(['C', 'I']);

    sia.exec('file', [conditionFilter, cityFilter, docOrigin], insert, './dist/app/SIA/SIAJob.js')
}
*/
/* 
sinan: {
    const storage = database.document.mongo('mongodb://localhost:27017/', 'sinan', 'iexo');
    const insert = async (record: any) => {
        await storage.collection.insertOne(record);
    };
    const gateway = await SINANFTPGateway.getInstanceOf(ftp!);
    const sinan = SINAN.init(gateway, 5);
    await sinan.subset({
        src: 'IEXO' as SINANDatasource,
        states: ['BR'],
        period: {
            start: {
                year: 2020
            },
            end: {
                year: 2021
            }
        }
    })
    const conditionFilter = NotificationSINANManyPrimaryConditionsCriteria.set(cid.list);
    const cityFilter = NotificationSINANSingleCityCriteria.set(city);

    sinan.exec('file', [ conditionFilter, cityFilter ], insert, './dist/app/SINAN/SINANJob.js')
}
*/
