// @filename: SIAManyCitiesCriteria.ts

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
import { InvalidCharacter } from "../../../core/error/InvalidCharacter.js";

export class BPASIAManyCitiesCriteria extends ArrayCriteria<BPA, 'PA_UFMUN'> {
    static set(cityCode: string[]) {
        const expression = /^\d+$/;
        cityCode.every(city => {
            expression.test(city)  || InvalidCharacter.exception('O código do município deve conter apenas números.');
            //cityCode.length === 6 || InvalidLength.exception('O código do município é o de 6 digítos.')
        })
        return new BPASIAManyCitiesCriteria('BPASIAManyCitiesCriteria', cityCode, 'PA_UFMUN')
    }
}

export class APACSIAManyCitiesCriteria extends ArrayCriteria<APAC, 'AP_UFMUN'> {
    static set(cityCode: string[]) {
        const expression = /^\d+$/;
        cityCode.every(city => {
            expression.test(city)  || InvalidCharacter.exception('O código do município deve conter apenas números.');
            //cityCode.length === 6 || InvalidLength.exception('O código do município é o de 6 digítos.')
        })
        return new APACSIAManyCitiesCriteria('APACSIAManyCitiesCriteria', cityCode, 'AP_UFMUN')
    }
}

export class RAASSIAManyCitiesCriteria extends ArrayCriteria<RAAS, 'UFMUN'> {
    static set(cityCode: string[]) {
        const expression = /^\d+$/;
        cityCode.every(city => {
            expression.test(city)  || InvalidCharacter.exception('O código do município deve conter apenas números.');
            //cityCode.length === 6 || InvalidLength.exception('O código do município é o de 6 digítos.')
        })
        return new RAASSIAManyCitiesCriteria('RAASSIAManyCitiesCriteria', cityCode, 'UFMUN')
    }
}
