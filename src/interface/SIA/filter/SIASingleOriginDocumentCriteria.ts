// @filename: SIASingleOriginDocumentCriteria.ts

import { APAC } from "../../../app/SIA/APAC.js";
import { BPA } from "../../../app/SIA/BPA.js";
import { RAAS } from "../../../app/SIA/RAAS.js";
import { StringCriteria } from "../../../app/StringCriteria.js";

export class BPASIASingleOriginDocument extends StringCriteria<BPA, 'PA_DOCORIG'> {
    static set<S extends string = 'P' | 'C' | 'A' | 'B' | 'I'>(typeOfDocument: S) {
        return new BPASIASingleOriginDocument('BPASIASingleOriginDocument', typeOfDocument, 'PA_DOCORIG')
    }
}

export class APACSIASingleOriginDocument extends StringCriteria<APAC, 'AP_DOCORIG'> {
    static set<S extends string = 'P' | 'C' | 'A' | 'B' | 'I'>(typeOfDocument: S) {
        return new APACSIASingleOriginDocument('APACSIASingleOriginDocument', typeOfDocument, 'AP_DOCORIG')
    }
}

export class RAASSIASingleOriginDocument extends StringCriteria<RAAS, 'DOCORIG'> {
    static set<S extends string = 'P' | 'C' | 'A' | 'B' | 'I'>(typeOfDocument: S) {
        return new RAASSIASingleOriginDocument('RAASSIASingleOriginDocument', typeOfDocument, 'DOCORIG')
    }
}
