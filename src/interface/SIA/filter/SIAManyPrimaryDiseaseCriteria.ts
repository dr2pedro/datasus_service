// @filename: SIAManyPrimaryDisease.ts

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

export class BPASIAManyPrimaryConditionsCriteria extends ArrayCriteria<BPA, 'PA_CIDPRI'> {
    static set(conditionCode: string[]) {
        return new BPASIAManyPrimaryConditionsCriteria('BPASIAManyPrimaryConditionsCriteria', conditionCode, 'PA_CIDPRI')
    }
}

export class APACSIAManyPrimaryConditionsCriteria extends ArrayCriteria<APAC, 'AP_CIDPRI'> {
    static set(conditionCode: string[]) {
        return new APACSIAManyPrimaryConditionsCriteria('APACSIAManyPrimaryConditionsCriteria', conditionCode, 'AP_CIDPRI')
    }
}

export class RAASSIAManyPrimaryConditionsCriteria extends ArrayCriteria<RAAS, 'CIDPRI'> {
    static set(conditionCode: string[]) {
        return new RAASSIAManyPrimaryConditionsCriteria('RAASSIAManyPrimaryConditionsCriteria', conditionCode, 'CIDPRI')
    }
}
