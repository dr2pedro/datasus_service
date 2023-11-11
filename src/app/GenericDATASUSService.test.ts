// @filename: GenericDATASUSService.test.ts

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

import { before, describe, it, after } from "node:test";
import { deepEqual, strictEqual } from "node:assert";
import { SIA } from "./SIA/SIA.js";
import { BasicFTPClient } from "../interface/BasicFTPClient.js";
import { SIAFTPGateway } from "../interface/SIA/SIAFTPGateway.js";

describe('Testando o GenericDATASUSService service com...', () => {
    let ftp: BasicFTPClient | undefined;
    let siasusGateway: SIAFTPGateway | undefined;
    let siasusService: SIA;
    
    before(async () => {
        ftp = await BasicFTPClient.connect('ftp.datasus.gov.br');
        siasusGateway = await SIAFTPGateway.getInstanceOf(ftp!);
        siasusService = SIA.init(siasusGateway!);
    })
    
    it('o subset com parâmetros válidos.', async () => {
        await siasusService.subset({ src: 'PA', states: ['RJ'] })
        strictEqual(siasusService.files.at(0), 'PARJ0801.dbc');
    });
    
    it('os chunks divididos corretamente.', () => {
        deepEqual(siasusService.chunks.at(0), ['PARJ0801.dbc', 'PARJ0802.dbc'])
    });

    after(() => {
        ftp?.close()
    });
});