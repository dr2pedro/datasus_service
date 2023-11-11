// @filename: SIMFTPGateway.test.ts

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
import { SIMFTPGateway } from "./SIMFTPGateway.js";

describe('Testando o SIMFTPGateway com...', () => {
    let ftp: BasicFTPClient | undefined;
    let sim: SIMFTPGateway | undefined;

    before(async () => {
        ftp = await BasicFTPClient.connect('ftp.datasus.gov.br');
        sim = await SIMFTPGateway.getInstanceOf(ftp!);
    })

    it('o list retornando os dados das declarações de óbito do rio de janeiro de 2020 a 2021.', async () => {
        const list = await sim?.list({ src: 'DO', states: ['RJ'], period: { start: { year: 2020 }, end: { year: 2021 } } }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'DORJ2020.dbc');
        ok(list?.every(i => i.name.startsWith('DORJ')));
    });

    it('o list retornando os dados das decalrações de óbito por causas externas do ano de 2020.', async() => {
        const list = await sim?.list({ src: 'DOEXT', period: { start: { year: 2020 }, end: { year: 2020 }}});
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'DOEXT20.dbc')
    });

    after(() => {
        ftp?.close()
    });
});