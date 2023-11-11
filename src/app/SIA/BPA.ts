// @filename: BPA.ts

/*
 *     Copyright 2023 Pedro Paulo Teixeira dos Santos

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http?://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import { DATASUSRecord } from "../../core/DATASUSRecord.js"

/** The 'Produção Ambulatorial' document in the SIASUS datasource.  */
export type BPA = DATASUSRecord & {
    'PA_CODUNI'?: string,
    'PA_GESTAO'?: string,
    'PA_CONDIC'?: string,
    'PA_UFMUN'?: string,
    'PA_REGCT'?: string,
    'PA_INCOUT'?: string,
    'PA_INCURG'?: string,
    'PA_TPUPS'?: string,
    'PA_TIPPRE'?: string,
    'PA_MN_IND'?: string,
    'PA_CNPJCPF'?: string,
    'PA_CNPJMNT'?: string,
    'PA_CNPJ_CC'?: string,
    'PA_MVM'?: string,
    'PA_CMP'?: string,
    'PA_PROC_ID'?: string,
    'PA_TPFIN'?: string,
    'PA_SUBFIN'?: string,
    'PA_NIVCPL'?: string,
    'PA_DOCORIG'?: string,
    'PA_AUTORIZ'?: string,
    'PA_CNSMED'?: string,
    'PA_CBOCOD'?: string,
    'PA_MOTSAI'?: string,
    'PA_OBITO'?: string,
    'PA_ENCERR'?: string,
    'PA_PERMAN'?: string,
    'PA_ALTA'?: string,
    'PA_TRANSF'?: string,
    'PA_CIDPRI'?: string,
    'PA_CIDSEC'?: string,
    'PA_CIDCAS'?: string,
    'PA_CATEND'?: string,
    'PA_IDADE'?: string,
    'IDADEMIN'?: string,
    'IDADEMAX'?: string,
    'PA_FLIDADE'?: string,
    'PA_SEXO'?: string,
    'PA_RACACOR'?: string,
    'PA_MUNPCN'?: string,
    'PA_QTDPRO'?: string,
    'PA_QTDAPR'?: string,
    'PA_VALPRO'?: string,
    'PA_VALAPR'?: string,
    'PA_UFDIF'?: string,
    'PA_MNDIF'?: string,
    'PA_DIF_VAL'?: string,
    'NU_VPA_TOT'?: string,
    'NU_PA_TOT'?: string,
    'PA_INDICA'?: string,
    'PA_CODOCO'?: string,
    'PA_FLQT'?: string,
    'PA_FLER'?: string,
    'PA_ETNIA'?: string,
    'PA_VL_CF'?: string,
    'PA_VL_CL'?: string,
    'PA_VL_INC'?: string,
    'PA_SRC_C'?: string,
    'PA_INE'?: string,
    'PA_NAT_JUR'?: string
    [key: string]: any
}