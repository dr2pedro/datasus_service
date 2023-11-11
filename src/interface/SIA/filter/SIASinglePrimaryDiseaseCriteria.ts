// @filename: SIASinglePrimaryDisease.ts

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

import { APAC } from "../../../app/SIA/APAC.js";
import { BPA } from "../../../app/SIA/BPA.js";
import { RAAS } from "../../../app/SIA/RAAS.js";
import { StringCriteria } from "../../../app/StringCriteria.js";

export class BPASIASinglePrimaryDisease extends StringCriteria<BPA, 'PA_CIDPRI'> {
    static set(conditionCode: string) {
        return new BPASIASinglePrimaryDisease('BPASIASinglePrimaryDisease', conditionCode, 'PA_CIDPRI')
    }
}

export class APACSIASinglePrimaryDisease extends StringCriteria<APAC, 'AP_CIDPRI'> {
    static set(conditionCode: string) {
        return new APACSIASinglePrimaryDisease('APACSIASinglePrimaryDisease', conditionCode, 'AP_CIDPRI')
    }
}

export class RAASSIASinglePrimaryDisease extends StringCriteria<RAAS, 'CIDPRI'> {
    static set(conditionCode: string) {
        return new RAASSIASinglePrimaryDisease('RAASSIASinglePrimaryDisease', conditionCode, 'CIDPRI')
    }
}