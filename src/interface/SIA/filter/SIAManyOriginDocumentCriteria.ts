// @filename: SIAManyOriginDocumentCriteria.ts

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

import { ArrayCriteria } from "../../../app/ArrayCriteria.js";
import { APAC } from "../../../app/SIA/APAC.js";
import { BPA } from "../../../app/SIA/BPA.js";
import { RAAS } from "../../../app/SIA/RAAS.js";

export class BPASIAManyOriginDocumentCriteria extends ArrayCriteria<BPA, 'PA_DOCORIG'> {
    static set<S extends string[] = Array<'P' | 'C' | 'A' | 'B' | 'I'>>(typeOfDocument: S) {
        return new BPASIAManyOriginDocumentCriteria('BPASIAManyOriginDocumentCriteria', typeOfDocument, 'PA_DOCORIG')
    }
}

export class APACSIAManyOriginDocumentCriteria extends ArrayCriteria<APAC, 'AP_DOCORIG'> {
    static set<S extends string[] = Array<'P' | 'C' | 'A' | 'B' | 'I'>>(typeOfDocument: S) {
        return new APACSIAManyOriginDocumentCriteria('APACSIAManyOriginDocumentCriteria', typeOfDocument, 'AP_DOCORIG')
    }
}

export class RAASSIAManyOriginDocumentCriteria extends ArrayCriteria<RAAS, 'DOCORIG'> {
    static set<S extends string[] = Array<'P' | 'C' | 'A' | 'B' | 'I'>>(typeOfDocument: S) {
        return new RAASSIAManyOriginDocumentCriteria('RAASSIAManyOriginDocumentCriteria', typeOfDocument, 'DOCORIG')
    }
}
