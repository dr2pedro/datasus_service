// @filename: SINANFTPGateway.test.ts

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

import { after, before, describe, it } from "node:test";
import { strictEqual, ok } from "node:assert";
import { SINANFTPGateway } from "./SINANFTPGateway.js";
import { BasicFTPClient } from "../BasicFTPClient.js";
import { FileInfo } from "basic-ftp";

describe('Testando o SINANFTPGateway com...', () => {
    let ftp: BasicFTPClient | undefined;
    let sinan: SINANFTPGateway | undefined;

    before(async () => {
        ftp = await BasicFTPClient.connect('ftp.datasus.gov.br');
        sinan = await SINANFTPGateway.getInstanceOf(ftp!);
    })

    it('o list retornando os dados de intoxicação exógena.', async () => {
        const list = await sinan?.list({ src: 'IEXO', states: ['BR'], period: { start: { year: 2020 }, end: { year: 2021 } } }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'IEXOBR20.dbc');
        ok(list?.every(apac => apac.name.startsWith('IEXO')));
    });

    after(() => {
        ftp?.close()
    });
});