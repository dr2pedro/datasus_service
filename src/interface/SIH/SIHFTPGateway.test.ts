// @filename: SIHFTPGateway.test.ts

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
import { BasicFTPClient } from "../BasicFTPClient.js";
import { FileInfo } from "basic-ftp";
import { SIHFTPGateway } from "./SIHFTPGateway.js";

describe('Testando o SIHFTPGateway com...', () => {
    let ftp: BasicFTPClient | undefined;
    let sih: SIHFTPGateway | undefined;

    before(async () => {
        ftp = await BasicFTPClient.connect('ftp.datasus.gov.br');
        sih = await SIHFTPGateway.getInstanceOf(ftp!);
    })

    it('o list retornando os dados de intoxicação exógena.', async () => {
        const list = await sih?.list({ src: 'RD', states: ['RJ'], period: { start: { month: '01', year: 2020 }, end: { month: '12', year: 2021 } } }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'RDRJ2001.dbc');
        ok(list?.every(apac => apac.name.startsWith('RDRJ')));
    });

    after(() => {
        ftp?.close()
    });
});