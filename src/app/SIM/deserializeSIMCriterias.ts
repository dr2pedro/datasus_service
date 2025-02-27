// @filename: deserializeSIMCriteria.ts

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
import { Criteria } from "../../core/Criteria.js"
import { DOSIMManyCitiesCriteria } from "../../interface/SIM/filter/SIMManyCitiesCriteria.js";
import { DOSIMManyPrimaryConditionsCriteria } from "../../interface/SIM/filter/SIMManyPrimaryDiseaseCriteria.js";

export function deserializeSIMCriteria(criteria: Criteria<Notification>) {
    switch (criteria.name) {
        case 'DOSIMManyPrimaryConditionsCriteria':
            return DOSIMManyPrimaryConditionsCriteria.set(criteria.array!)
        case 'DOSIMManyCitiesCriteria':
            return DOSIMManyCitiesCriteria.set(criteria.array!)
        default:
            break;
    }
}