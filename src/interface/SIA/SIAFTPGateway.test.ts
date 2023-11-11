// @filename: SIAFTPGateway.test.ts

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
import { SIAFTPGateway } from "./SIAFTPGateway.js";
import { FileInfo } from "basic-ftp";
import { BasicFTPClient } from "../BasicFTPClient.js";

describe('Testando o SIAFTPGateway com...', () => {
    let ftp: BasicFTPClient | undefined;
    let siasus: SIAFTPGateway | undefined;
    
    before(async () => {
        ftp = await BasicFTPClient.connect('ftp.datasus.gov.br');
        siasus = await SIAFTPGateway.getInstanceOf(ftp!);
    })

    it('o list retornando apenas arquivos da APAC de acompanhamento a Cirurgia Bariátrica.', async () => {
        const list = await siasus?.list({ src: 'AB'}) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'ABDF1112.dbc');
        ok(list?.every(apac => apac.name.startsWith('AB')));
    });

    it('o list retornando apenas arquivos de APAC de acompanhamento pós Cirurgia Bariátrica.', async () => {
        const list = await siasus?.list({ src: 'ABO' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'ABOAC1502.dbc');
        ok(list?.every(apac => apac.name.startsWith('ABO')));
    });

    it('o list retornando apenas arquivos de APAC de Confecção de Fístulas Arteriovenosas.', async () => {
        const list = await siasus?.list({ src: 'ACF' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'ACFAC1408.dbc');
        ok(list?.every(apac => apac.name.startsWith('ACF')));
    });

    it('o list retornando apenas arquivos de APAC de Laudos Diversos.', async () => {
        const list = await siasus?.list({ src: 'AD' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'ADAC0801.dbc');
        ok(list?.every(apac => apac.name.startsWith('AD')));
    });

    it('o list retornando apenas arquivos de APAC de Medicamentos.', async () => {
        const list = await siasus?.list({ src: 'AM' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'AMAC0801.dbc');
        ok(list?.every(apac => apac.name.startsWith('AM')));
    });

    it('o list retornando apenas arquivos de APAC de Nefrologia.', async () => {
        const list = await siasus?.list({ src: 'AN' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'ANAC0801.dbc');
        ok(list?.every(apac => apac.name.startsWith('AN')));
    });

    it('o list retornando apenas arquivos de APAC de Quimioterapia.', async () => {
        const list = await siasus?.list({ src: 'AQ' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'AQAC0803.dbc');
        ok(list?.every(apac => apac.name.startsWith('AQ')));
    });

    it('o list retornando apenas arquivos de APAC de Radioterapia.', async () => {
        const list = await siasus?.list({ src: 'AR'}) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'ARAC0803.dbc');
        ok(list?.every(apac => apac.name.startsWith('AR')));
    });

    it('o list retornando apenas arquivos de APAC de Tratamento Dialítico.', async () => {
        const list = await siasus?.list({ src: 'ATD' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'ATDAC1408.dbc');
        ok(list?.every(apac => apac.name.startsWith('ATD')));
    });

    it('o list retornando apenas arquivos de Produção Ambulatorial.', async () => {
        const list = await siasus?.list({ src: 'PA' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'PAAC0801.dbc');
        ok(list?.every(pa => pa.name.startsWith('PA')));
    });

    it('o list retornando apenas arquivos de Psicossocial.', async () => {
        const list = await siasus?.list({ src: 'PS' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'PSAC1305.dbc');
        ok(list?.every(ps => ps.name.startsWith('PS')));
    });

    it('o list retornando apenas arquivos de Atenção Domiciliar.', async () => {
        const list = await siasus?.list({ src: 'SAD' }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name,'SADAC1307.dbc');
        ok(list?.every(sad => sad.name.startsWith('SAD')));
    });

    it('o list retornando apenas arquivos de Produção Ambulatorial do Rio de Janeiro.', async () => {
        const list = await siasus?.list({ src: 'PA', states: ['RJ'] }) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'PARJ0801.dbc');
        ok(list?.every(pa => pa.name.startsWith('PARJ')));
    });

    it('o list retornando apenas arquivos de Produção Ambulatorial do Rio de Janeiro de determinado período.', async () => {
        const list = await siasus?.list({ src: 'PA', states: ['RJ'], period: { start: { year: 2020, month: '01'}, end: { year: 2020, month: '02'} }}) as FileInfo[];
        const firstFile = list?.at(0);
        strictEqual(firstFile?.name, 'PARJ2001.dbc');
        ok(list?.every(pa => pa.name.startsWith('PARJ')));
    });

    it('o list retornando apenas os nomes dos arquivos de Produção Ambulatorial do Rio de Janeiro de determinado período.', async () => {
        const list = await siasus?.list({ src: 'PA', states: ['RJ'], period: { start: { year: 2020, month: '01'}, end: { year: 2020, month: '02'} }}, 'short') as string[];
        const firstFile = list?.at(0);
        strictEqual(firstFile, 'PARJ2001.dbc');
        ok(list?.every(pa => pa.startsWith('PARJ')));
    });

    it('o get baixando um arquivo na pasta raiz.', async () => {
        ok(
            await siasus?.get('PARJ2212b.dbc')
        )
    });

    after(() => {
        ftp?.close()
    });
});