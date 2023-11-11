// @filename: SIHManyCityCriteria.ts

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

import { AIH } from "../../../app/SIH/AIH.js";
import { SP } from "../../../app/SIH/SP.js";
import { ArrayCriteria } from "../../../app/ArrayCriteria.js";
import { InvalidCharacter } from "../../../core/error/InvalidCharacter.js";

export class AIHSIHManyCitiesCriteria extends ArrayCriteria<AIH, 'MUNIC_MOV'> {
    static set(cityCode: string[]) {
        const expression = /^\d+$/;
        cityCode.every(city => {
            expression.test(city)  || InvalidCharacter.exception('O código do município deve conter apenas números.');
            //cityCode.length === 6 || InvalidLength.exception('O código do município é o de 6 digítos.')
        })
        return new AIHSIHManyCitiesCriteria('AIHSIHManyCitiesCriteria', cityCode, 'MUNIC_MOV')
    }
}

export class SPSIHManyCitiesCriteria extends ArrayCriteria<SP, 'SP_GESTOR'> {
    static set(cityCode: string[]) {
        const expression = /^\d+$/;
        cityCode.every(city => {
            expression.test(city)  || InvalidCharacter.exception('O código do município deve conter apenas números.');
            //cityCode.length === 6 || InvalidLength.exception('O código do município é o de 6 digítos.')
        })
        return new SPSIHManyCitiesCriteria('SPSIHManyCitiesCriteria', cityCode, 'SP_GESTOR')
    }
}
