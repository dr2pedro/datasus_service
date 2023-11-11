// @filename: deserializeSIHCriteria.ts

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
import { SP } from "./SP.js";
import { AIH } from "./AIH.js";
import { Criteria } from "../../core/Criteria.js"
import { AIHSIHManyCitiesCriteria, SPSIHManyCitiesCriteria } from "../../interface/SIH/filter/SIHManyCityCriteria.js";
import { AIHSIHSingleCityCriteria, SPSIHSingleCityCriteria } from "../../interface/SIH/filter/SIHSingleCityCriteria.js";
import { AIHSIHManyPrimaryConditionsCriteria, SPSIHManyPrimaryConditionsCriteria } from "../../interface/SIH/filter/SIHManyPrimaryDiseaseCriteria.js";

export function deserializeSIHCriteria(criteria: Criteria<AIH | SP>) {
    switch (criteria.name) {
        case 'AIHSIHManyCitiesCriteria':
            return AIHSIHManyCitiesCriteria.set(criteria.array!)
        case 'SPSIHManyCitiesCriteria':
            return SPSIHManyCitiesCriteria.set(criteria.array!)
        case 'AIHSIHManyPrimaryConditionsCriteria':
            return AIHSIHManyPrimaryConditionsCriteria.set(criteria.array!)
        case 'SPSIHManyPrimaryConditionsCriteria':
            return SPSIHManyPrimaryConditionsCriteria.set(criteria.array!)
        case 'AIHSIHSingleCityCriteria':
            return AIHSIHSingleCityCriteria.set(criteria.str!)
        case 'SPSIHSingleCityCriteria':
            return SPSIHSingleCityCriteria.set(criteria.str!)
        default:
            break;
    }
}