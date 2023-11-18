// @filename: SIMFTPGateway.ts

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

import { SIMSubset } from "../../app/SIM/SIMSubset.js";
import { DATASUSGenericFTPGateway } from "../DATASUSGenericFTPGateway.js";
import { FTPClient } from "../FTPClient.js";

export class SIMFTPGateway extends DATASUSGenericFTPGateway<SIMSubset> {
    /** Protected constructor. */
    private constructor(ftp: FTPClient){
        super(ftp, '/dissemin/publicos/SIM/');
    }

    /**
     *  Initialize the SIHFTPGateway.
     *  @param { FTPClient } client - Some FTPClient.
     *  @returns { SIMFTPGateway }
     */
    static async getInstanceOf(ftp: FTPClient) {
        return new SIMFTPGateway(ftp)
    }

    /**
     *  List all files avaiable in SIM datasource.
     *  @param { SIMSubset } input - The params that splits the SINAN datasource.
     *  @param { 'full' | 'short' } display - The display format, if is short will be only the filenames.
     *  @returns { Promise<string[] | unknown[]>}
     */
    override async list(input: SIMSubset , display: 'full' | 'short' = 'full') {
        const type = 'period' in input && input.period.start.year > (new Date().getFullYear() - 3) ? 'PRELIM' : 'CID10';
        const doresOrDofet = input.src === 'DO' ? 'DORES' : 'DOFET';
        let list = await this.client.list(this.PATH + type + '/' + doresOrDofet);
        let seq:any[] = [];

        if('src' in input && 'period' in input) {
            if(input.period && input.period.start.year < 1980 || input.period && input.period.end.year > new Date(Date.now()).getFullYear()) {
                throw new Error('Invalid Period.')
            }

            for (let ano = input.period.start.year; ano <= input.period.end.year; ano++) {
                const stringAno = input.src === 'DO'  ? ano.toString() : ano.toString().slice(-2);
                seq.push(stringAno);
            }

        }

        if('src' in input && 'states' in input) {
            if(input.src !== 'DO') {
                throw new Error("The special DO's do not have states.")
            }

            list = input.states.map(state => {
                return list.filter((i: { name: string; }) => i.name.startsWith(input.src+state))
            }).flat();
            
        }

        list = seq.map(year => {
            if(doresOrDofet === 'DORES' && 'states' in input) {
                return input.states.map(state => {
                    return list.filter((i: { name: string; }) => i.name.startsWith(input.src+state+year))
                }).flat()
            } else {
                return list.filter((i: { name: string; }) => i.name.startsWith(input.src+year))
            }
        }).flat();
        return  display === 'full' ? 
                list.filter((i: { name: string; }) => i.name.startsWith(input.src)) : 
                list.filter((i: { name: string; }) => i.name.startsWith(input.src)).map((item: { name: any }) => item.name) 
    }

    /**
     *  Downloads some file of the FTP.
     *  @param { string } file - The filename.
     *  @param { string } dest - The destination to be saved.
     *  @returns { void }
     */
    override async get(file: string, dest?: string) {
        const match = file.match(/^([A-Z]+)([A-Z]+)(\d+).(dbc|DBC)$/);
        const type = parseInt(match![3]) <= (new Date().getFullYear() - 2) ? 'CID10' : 'PRELIM';
        const doresOrDofet =    file.startsWith('DORES') ? 'DOFET' :
                                file.startsWith('DOFET') ? 'DOFET' :
                                file.startsWith('DOINF') ? 'DOFET' :
                                file.startsWith('DOMAT') ? 'DOFET' :
                                file.startsWith('DOEXT') ? 'DOFET' : 'DORES';
        return await this.client?.download(dest || file, `${this.PATH}${type}/${doresOrDofet}/${file}`);
    }
}