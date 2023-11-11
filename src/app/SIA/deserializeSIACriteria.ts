// @filename: deserializeSIACriteria.ts

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

import { BPA } from "./BPA.js";
import { RAAS } from "./RAAS.js";
import { APAC } from "./APAC.js";
import { Criteria } from "../../core/Criteria.js";
import { BPASIAManyCitiesCriteria, APACSIAManyCitiesCriteria, RAASSIAManyCitiesCriteria } from "../../interface/SIA/filter/SIAManyCityCriteria.js";
import { BPASIAManyOriginDocumentCriteria, APACSIAManyOriginDocumentCriteria, RAASSIAManyOriginDocumentCriteria } from "../../interface/SIA/filter/SIAManyOriginDocumentCriteria.js";
import { BPASIAManyPrimaryConditionsCriteria, APACSIAManyPrimaryConditionsCriteria, RAASSIAManyPrimaryConditionsCriteria } from "../../interface/SIA/filter/SIAManyPrimaryDiseaseCriteria.js";
import { BPASIASingleCityCriteria, APACSIASingleCityCriteria, RAASSIASingleCityCriteria } from "../../interface/SIA/filter/SIASingleCityCriteria.js";
import { BPASIASingleOriginDocument, APACSIASingleOriginDocument, RAASSIASingleOriginDocument } from "../../interface/SIA/filter/SIASingleOriginDocumentCriteria.js";
import { BPASIASinglePrimaryDisease, APACSIASinglePrimaryDisease, RAASSIASinglePrimaryDisease } from "../../interface/SIA/filter/SIASinglePrimaryDiseaseCriteria.js";


export function deserializeSIACriteria(criteria: Criteria<BPA | RAAS | APAC>) {
    switch (criteria.name) {
        case 'BPASIAManyCitiesCriteria':
            return BPASIAManyCitiesCriteria.set(criteria.array!)
        case 'APACSIAManyCitiesCriteria':
            return APACSIAManyCitiesCriteria.set(criteria.array!)
        case 'RAASSIAManyCitiesCriteria':
            return RAASSIAManyCitiesCriteria.set(criteria.array!)
        case 'BPASIAManyPrimaryConditionsCriteria':
            return BPASIAManyPrimaryConditionsCriteria.set(criteria.array!)
        case 'APACSIAManyPrimaryConditionsCriteria':
            return APACSIAManyPrimaryConditionsCriteria.set(criteria.array!)
        case 'RAASSIAManyPrimaryConditionsCriteria':
            return RAASSIAManyPrimaryConditionsCriteria.set(criteria.array!)
        case 'BPASIAManyOriginDocumentCriteria':
            return BPASIAManyOriginDocumentCriteria.set(criteria.array!)
        case 'APACSIAManyOriginDocumentCriteria':
            return APACSIAManyOriginDocumentCriteria.set(criteria.array!)
        case 'RAASSIAManyOriginDocumentCriteria':
            return RAASSIAManyOriginDocumentCriteria.set(criteria.array!)
        case 'BPASIASingleCityCriteria':
            return BPASIASingleCityCriteria.set(criteria.str!)
        case 'APACSIASingleCityCriteria':
            return APACSIASingleCityCriteria.set(criteria.str!)
        case 'RAASSIASingleCityCriteria':
            return RAASSIASingleCityCriteria.set(criteria.str!)
        case 'BPASIASinglePrimaryDisease':
            return BPASIASinglePrimaryDisease.set(criteria.str!)
        case 'APACSIASinglePrimaryDisease':
            return APACSIASinglePrimaryDisease.set(criteria.str!)
        case 'RAASSIASinglePrimaryDisease':
            return RAASSIASinglePrimaryDisease.set(criteria.str!)
        case 'BPASIASingleOriginDocument':
            return BPASIASingleOriginDocument.set(criteria.str!)
        case 'APACSIASingleOriginDocument':
            return APACSIASingleOriginDocument.set(criteria.str!)
        case 'RAASSIASingleOriginDocument':
            return RAASSIASingleOriginDocument.set(criteria.str!)
        default:
            break;
    }
}