// @filename: ICD10.test.ts

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
import { strictEqual, deepEqual, ok } from "node:assert";
import { ICD10 } from "./ICD10.js";

describe('Testando o ICD10 com...', () => {
    let icd10: ICD10;

    before(async () => {
        icd10 = await ICD10.load();
    });
    
    it('o size e os fields retornando valores que fazem sentido.', () => {
        strictEqual(icd10.size, 14198);
        deepEqual([
            { name: 'CID10', type: 'C', size: 4, decimalPlaces: 0 },
            { name: 'OPC', type: 'C', size: 1, decimalPlaces: 0 },
            { name: 'CAT', type: 'C', size: 1, decimalPlaces: 0 },
            { name: 'SUBCAT', type: 'C', size: 1, decimalPlaces: 0 },
            { name: 'DESCR', type: 'C', size: 50, decimalPlaces: 0 },
            { name: 'RESTRSEXO', type: 'C', size: 1, decimalPlaces: 0 }
        ], icd10.fields);
    });

    it('a comparação do primeiro cid do primeiro bloco(A).', async() => {
        deepEqual(icd10.avaiableBlocks?.A.at(0), { CID10: 'A00', OPC: '', CAT: 'S', SUBCAT: 'N', DESCR: 'A00   Colera', RESTRSEXO: '5' })
    });

    it('a comparação do primeiro cid do segundo bloco(B).', async() => {
        deepEqual(icd10.avaiableBlocks?.B.at(0), { CID10: 'B00', OPC: '', CAT: 'S', SUBCAT: 'N', DESCR: 'B00   Infecc p/virus do herpes', RESTRSEXO: '5' })
    });

    it('a escolha de um bloco inteiro para ser incluido na lista final.', () => {
        strictEqual(icd10.list.length, 0);
        icd10.block('A')
        ok(icd10.list.length > 0)
    });

    it('o clear limpando a seleção.', () => {
        icd10.clear();
        strictEqual(icd10.list.length, 0);
    });

    it('a escolha de um recorte do bloco para ser incluido na lista final', () => {
        icd10.block('A', { start: '00', end: '001'});
        strictEqual(icd10.list.length, 3);
    });

    it('o remove tirando um da lista corretamente.', () => {
        icd10.remove('A00');
        strictEqual(icd10.list.length, 2)
    });

    after(() => {
        true
    })
});