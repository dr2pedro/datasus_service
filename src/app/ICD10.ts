// @filename: ICD10.ts

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

import { DBFFile, FieldDescriptor } from "dbffile";

type ICD10Row = { CID10: string, OPC: string, CAT: string, SUBCAT: string, DESCR: string, RESTRSEXO: Blocks };
type Blocks = {
    "A": ICD10Row[], "B": ICD10Row[], "C": ICD10Row[], "D": ICD10Row[], "E": ICD10Row[], "F": ICD10Row[], "G": ICD10Row[], "H": ICD10Row[], 
    "I": ICD10Row[], "J": ICD10Row[], "K": ICD10Row[], "L": ICD10Row[], "M": ICD10Row[], "N": ICD10Row[], "O": ICD10Row[], "P": ICD10Row[],
    "Q": ICD10Row[], "R": ICD10Row[], "S": ICD10Row[], "T": ICD10Row[], "U": ICD10Row[], "V": ICD10Row[], "W": ICD10Row[], "X": ICD10Row[], 
    "Y": ICD10Row[], "Z": ICD10Row[]
}

const emptyBlocks = {
    "A": [] = [], "B": [] = [], "C": [] = [], "D": [] = [], "E": [] = [], "F": [] = [], "G": [] = [], "H": [] = [], 
    "I": [] = [], "J": [] = [], "K": [] = [], "L": [] = [], "M": [] = [], "N": [] = [], "O": [] = [], "P": [] = [],
    "Q": [] = [], "R": [] = [], "S": [] = [], "T": [] = [], "U": [] = [], "V": [] = [], "W": [] = [], "X": [] = [], 
    "Y": [] = [], "Z": [] = []
}

export class ICD10 {
    /** Size in documents. */
    readonly size!: number;
    /** All 'columns' avaiable in this file. */
    readonly fields!: FieldDescriptor[];
    /** Selected icds. */
    private _list: ICD10Row[] = [];

    /**
     *  Return all blocks registered.
     */
    get avaiableBlocks() {
        return this.splitedBlocks
    }

    /**
     *  Return the selected list.
     */
    get list() {
        return this._list.map(i => i.CID10)
    }

    /**
     *  Select the ICD10 chapter to includes in the list.
     *  @param chapter - The ICD10 chapter to select.
     *  @param subset - The params to cut the chapter.
     *  @returns 
     */
    block(chapter: keyof Blocks, subset?: { start: string, end: string }) {
        const chunk: ICD10Row[] = this.splitedBlocks![chapter as keyof typeof this.splitedBlocks];
        if(subset) {
            let startICD: string = `${chapter}${subset.start}`;
            let endICD: string = `${chapter}${subset.end}`;
            let startIndex = chunk.findIndex((row) => row.CID10 === startICD);
            let endIndex  = chunk.findIndex((row) => row.CID10 === endICD);
            // Tem que rolar algum tipo de check pq ele corta errado se a numerações não existirem ao invés de jogar exception.
            this._list.push(...chunk.slice(startIndex, endIndex +1))
            return this
        }

        this._list.push(...chunk)
        return this
    }

    /**
     *  Removes some icd from list.
     *  @param icd - The icd code to be removed.
     *  @returns 
     */
    remove(icd: string) {
        const chunk: ICD10Row[] = this._list;
        this._list = chunk.filter((row) => row.CID10 !== icd)
        return this
    }

    /**
     *  Clear all selections.
     */
    clear() {
        this._list = [];
        return this
    }

    /** Protected constructor. */
    private constructor(private dbf: DBFFile, private splitedBlocks?: Blocks) {
        this.size = dbf.recordCount;
        this.fields = dbf.fields;
    }

    /**
     *  Loads the ICD10 from a .dbf file.
     *  @param ICD10FilePath 
     *  @returns 
     */
    static async load(ICD10FilePath: string = './assets/CID10.dbf') {
        let dbf = await DBFFile.open(ICD10FilePath);
        let blocks = await dbf.readRecords(dbf.recordCount) as { CID10: string, OPC: string, CAT: string, SUBCAT: string, DESCR: string, RESTRSEXO: string}[];
        let splitedblocks = blocks.reduce((acc: Blocks, item) => {
            // @ts-ignore
            acc[item.CID10.charAt(0) as keyof typeof acc].push(item)
            return acc
        }, emptyBlocks);

        return new ICD10(dbf, splitedblocks)
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