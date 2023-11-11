// @filename: BasicFTPClient.test.ts

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

import { describe, it, after } from "node:test";
import { ok, rejects, strictEqual } from "node:assert";
import { BasicFTPClient } from "./BasicFTPClient.js";

describe('Testando o FTPClient com...', () => {
    let client: BasicFTPClient | undefined;
    
    it('uma string de conexão válida.', async () => {
        client = await BasicFTPClient?.connect('ftp.datasus.gov.br');
        ok(client);
    });

    it('uma string de conexão inválida.', async () => {
        await rejects(
            async () => {
                await BasicFTPClient?.connect('')
            },
            (error: Error) => {
                strictEqual(error.name, 'CouldNotConnect');
                strictEqual(error.message, 'Some connection error ocurred.');
                return true;
            }
        )
    });

    it('o list retornando os dados de um repositório ftp.', async () => {
        const filesMeta = await client?.list();
        strictEqual(filesMeta![0].name, 'agvigsan');
    });

    it('o download baixando um arquivo corretamente.', async () => {
        ok(
            await client?.download('PARJ2212a.dbc', '/dissemin/publicos/SIASUS/200801_/Dados/PARJ2212a.dbc')
        )
    });

    after(() => {
        client?.close()
    })
});