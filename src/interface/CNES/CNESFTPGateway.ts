// @filename: CNESFTPGateway.ts

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

import { CNESSubset } from "../../app/CNES/CNESSubset.js";
import { DATASUSGenericFTPGateway } from "../DATASUSGenericFTPGateway.js";
import { FTPClient } from "../FTPClient.js";

export class CNESFTPGateway extends DATASUSGenericFTPGateway<CNESSubset>{
    /** Protected constructor. */
    private constructor(ftp: FTPClient){
        super(ftp, '/dissemin/publicos/CNES/200508_/Dados/')
        /*
        ftp://ftp.datasus.gov.br/dissemin/publicos/CNES/200508_/Dados/EF/EFAM2212.dbc
        */
    }

    /**
     *  Initialize the CNESFTPGateway.
     *  @param { FTPClient } client - Some FTPClient.
     *  @returns { CNESFTPGateway }
     */
    static async getInstanceOf(ftp: FTPClient) {
        return new CNESFTPGateway(ftp)
    }

    /**
     *  Get a list of files avaiable files in datasource.
     *  @param { CNESSubset } input - The subset params to filter the files.
     *  @param { 'full' | 'short' } display - The way that the files metadata are returned. If 'short' only filenames will return.
     *  @returns { Promise<string[] | unknown[]> }
     */
    override async list(input: CNESSubset , display: 'full' | 'short' = 'full') {
        let list = await this.client.list(this.PATH + input.src + '/');
        let seq = [];

        if('src' in input && 'states' in input && 'period' in input && 'month' in input.period.start && 'month' in input.period.end) {
            if(input.period && input.period.start.year < 2008 || input.period && input.period.end.year > new Date(Date.now()).getFullYear()) {
                throw new Error('Invalid Period.')
            }

            for (let ano = input.period.start.year; ano <= input.period.end.year; ano++) {
                const mesInicial = (ano === input.period.start.year) ? parseInt(input.period.start.month, 10) : 1;
                const mesFinal = (ano === input.period.end.year) ? parseInt(input.period.end.month, 10) : 12;
            
                for (let mes = mesInicial; mes <= mesFinal; mes++) {
                    const stringAno = ano.toString().slice(-2);
                    const stringMes = mes.toString().padStart(2, '0');
            
                    seq.push(stringAno + stringMes);
                }
            };
            list = seq.map(yearMonth => {
                return input.states.map(state => {
                    return list.filter((i: { name: string; }) => i.name.startsWith(input.src+state+yearMonth))
                }).flat()
            }).flat();

            return  display === 'full' ? 
                    list : 
                    list.map((item: { name: any; }) => item.name)
        }

        if('src' in input && 'states' in input) {
            list = input.states.map(state => {
                return list.filter((i: { name: string; }) => i.name.startsWith(input.src+state))
            }).flat();
            
            return  display === 'full' ? 
                    list : 
                    list.map((item: { name: any; }) => item.name)
        }

        return  display === 'full' ? 
                list.filter((i: { name: string; }) => i.name.startsWith(input.src)) : 
                list.filter((i: { name: string; }) => i.name.startsWith(input.src)).map((item: { name: any; }) => item.name) 
    }
}