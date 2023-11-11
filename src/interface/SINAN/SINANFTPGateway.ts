// @filename: SINANFTPGateway.ts

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

import { SINANSubset } from "../../app/SINAN/SINANSubset.js";
import { DATASUSGenericFTPGateway } from "../DATASUSGenericFTPGateway.js";
import { FTPClient } from "../FTPClient.js";

/** The SINAN Gateway from FTP Client. */
export class SINANFTPGateway extends DATASUSGenericFTPGateway<SINANSubset>{
    /** Protected constructor. */
    private constructor(ftp: FTPClient){
        super(ftp, '/dissemin/publicos/SINAN/DADOS/');
    }

    /**
     *  Initialize the SINANFTPGateway.
     *  @param { FTPClient } client - Some FTPClient.
     *  @returns { SINANFTPGateway }
     */
    static async getInstanceOf(ftp: FTPClient) {
        return new SINANFTPGateway(ftp)
    }

    /**
     *  List all files avaiable in SINAN datasource.
     *  @param { SINANSubset } input - The params that splits the SINAN datasource.
     *  @param { 'full' | 'short' } display - The display format, if is short will be only the filenames.
     *  @returns { Promise<string[] | unknown[]>}
     */
    override async list(input: SINANSubset , display: 'full' | 'short' = 'full') {
        const type = 'period' in input && input.period.start.year > (new Date().getFullYear() - 4) ? 'PRELIM' : 'FINAIS';
        let list: Array<any> = await this.client.list(this.PATH + type);
        let seq: string[] = [];

        if('src' in input && 'period' in input) {
            if(input.period && input.period.start.year < 2008 || input.period && input.period.end.year > new Date(Date.now()).getFullYear()) {
                throw new Error('Invalid Period.')
            }

            for (let ano = input.period.start.year; ano <= input.period.end.year; ano++) {
                const stringAno = ano.toString().slice(-2);
                seq.push(stringAno);
            }
        }

        if('src' in input && 'states' in input) {   
            list = seq.map(year => {
                return list.filter(item => item.name.startsWith(input.src + input.states[0] + year))
            }).flat()

            return  display === 'full' ? 
                    list : 
                    list.map((item: { name: any; }) => item.name)
        }

        return  display === 'full' ? 
                list.filter((i: { name: string; }) => i.name.startsWith(input.src)) : 
                list.filter((i: { name: string; }) => i.name.startsWith(input.src)).map((item: { name: any; }) => item.name) 
    }

    /**
     *  Downloads some file of the FTP.
     *  @param { string } file - The filename.
     *  @param { string } dest - The destination to be saved.
     *  @returns { void }
     */
    override async get(file: string, dest?: string) {
        return await this.client?.download(dest || file, this.PATH+'PRELIM/'+file);
    }
}