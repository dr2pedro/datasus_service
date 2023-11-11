// @filename: Dbc.test.ts

/*
    Copyright 2023 Pedro Paulo Teixeira dos Santos

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
import { strictEqual, deepEqual } from "node:assert";
import { Dbc } from "./Dbc.js";
import { readFileSync } from "node:fs";

const fieldsBuffer = readFileSync('./assets/fields.json');
const fields = JSON.parse(fieldsBuffer.toString());
const firstRowBuffer = readFileSync('./assets/firstRow.json');
const firstRow = JSON.parse(firstRowBuffer.toString());

describe('Teste do conversor de Dbc com...', () => {
    let dbc: Dbc;

    before(async() => {
        dbc = await Dbc.load('./assets/PSSE2105.dbc');
    });

    it('o getter size retornando corretamente o tamanho', async () => {
        strictEqual(dbc.size, 13348);    
    });

    it('o map retornando os fields.', async() => {
        deepEqual(dbc.fields, fields);
    });

    it('o read retornando a primeira linha da tabela.', async() => {
        const firstRowToTest = await dbc.readBatch(1);
        delete firstRowToTest[0]["CNS_PAC"];
        delete firstRow["CNS_PAC"];
        deepEqual(firstRowToTest[0], firstRow);
    });

    it('a leitura dos records como Iterable.', () => {
        const asyncIterator = dbc.dbf[Symbol.asyncIterator]();
        strictEqual(typeof asyncIterator.next, 'function');
        strictEqual(typeof asyncIterator.return, 'function');
    });

    it('a aplicação de um callback em cada record do Iterable.', async () => {
        let size = 1;
        await dbc.forEachRecords(async () => {
            size = size +1
        })
        strictEqual(size, dbc.size)
    })

    after(() => {
        dbc.remove()
    });
});