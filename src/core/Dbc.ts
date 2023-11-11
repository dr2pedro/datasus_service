// @filename: Dbc.ts

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

import { statSync, unlink } from  "node:fs"
import { tmpdir } from "node:os";
import { parse } from "node:path";
import { createRequire } from 'module';
import { DBFFile, FieldDescriptor } from 'dbffile';
import { CanNotExcludeDbcFile } from "./error/CanNotExcludeDbcFile.js";
import { OSNotSupported } from "./error/OSNotSupported.js";

/** Since node addons only works with require() this is necessary to work with node modules. */
const require = createRequire(import.meta.url);
/** The addon that converts Dbc to Dbf. */
const addon = require('../../addon/build/Release/addon');

/** The file returned by the DataSUS Gateways. */
export class Dbc {
    /** Size in documents. */
    size!: number;
    /** All 'columns' avaiable in this file. */
    fields!: FieldDescriptor[];

    /** Protected constructor. */
    private constructor(readonly dbf: DBFFile, private readonly io: { input: string, output: string}) {
        this.size = dbf.recordCount;
        this.fields = dbf.fields;

        /* if (process.platform !== 'linux') {
            OSNotSupported.exception();
        } */
    }

    /**
     *  Loads the Dbc object in the memory.
     *  @param { string } inputFile - The name of the file.
     *  @returns { Promise<Dbc> }
     */
    static async load(inputFile: string) {
        const inputFilePath = parse(inputFile);
        const io = {
            input: inputFile,
            output: `${ tmpdir() }/${ inputFilePath.name}${ inputFilePath.ext }`
        }
        
        try {
            statSync(io.output);
        } catch(error: any) {
            addon(io);
        }

        let dbf = await DBFFile.open(io.output);
        return new Dbc(dbf, io)
    }

    /**
     *  Read a chunk of records in the file starting in the first position.
     *  @param { number } count - The end of the batch.
     *  @returns { Promise<Record<string, unknown>[]> }
     */
    async readBatch(count?: number): Promise<Record<string, unknown>[]> {
        const records = await this.dbf.readRecords(count || this.size);
        return records
    }

    /**
     *  Delete the Dbc file from storage.
     */
    remove(): void {
        const inputFilePath = parse(this.io.input);
        unlink(this.io.output, (error: any) => {
            if(error) CanNotExcludeDbcFile.exception(`${ inputFilePath.name}${ inputFilePath.ext }`);
            console.log(`${ inputFilePath.name}${ inputFilePath.ext } excluded.`)
        });
    }

    /**
     *  Reads each records and apply some callback function.
     *  @param { (record: any) => Promise<any> } callback 
     */
    async forEachRecords(callback: (record: any) => Promise<any>) {
        for await (let record of this.dbf) {
            callback(record)
        }
    }
}
