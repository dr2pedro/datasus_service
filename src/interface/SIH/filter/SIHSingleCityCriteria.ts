// @filename: SIHSingleCityCriteria.ts

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
import { StringCriteria } from "../../../app/StringCriteria.js";
import { InvalidCharacter } from "../../../core/error/InvalidCharacter.js";
import { InvalidLength } from "../../../core/error/InvalidLength.js";

export class AIHSIHSingleCityCriteria extends StringCriteria<AIH, 'MUNIC_MOV'> {
    static set(cityCode: string) {
        const expression = /^\d+$/;
        expression.test(cityCode)  || InvalidCharacter.exception('O código do município deve conter apenas números.');
        cityCode.length === 6 || InvalidLength.exception('O código do município é o de 6 digítos.')

        return new AIHSIHSingleCityCriteria('AIHSIHSingleCityCriteria', cityCode, 'MUNIC_MOV')
    }
}

export class SPSIHSingleCityCriteria extends StringCriteria<SP, 'SP_GESTOR'> {
    static set(cityCode: string) {
        const expression = /^\d+$/;
        expression.test(cityCode)  || InvalidCharacter.exception('O código do município deve conter apenas números.');
        cityCode.length === 6 || InvalidLength.exception('O código do município é o de 6 digítos.')

        return new SPSIHSingleCityCriteria('APACSIASingleCityCriteria', cityCode, 'SP_GESTOR')
    }
}
