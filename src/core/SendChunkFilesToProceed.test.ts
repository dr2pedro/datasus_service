// @filename: SendChunkFilesToProceed.test.ts

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

import { before, describe, it } from "node:test";
import { strictEqual, ok } from "node:assert";
import { SendChunkFilesToProceed } from "./SendChunkFilesToProceed.js";

describe('Testando SendChunkFilesToProceed com...', () => {
    let job: SendChunkFilesToProceed<any>;

    before(()=> {
        job = SendChunkFilesToProceed.define();
    });

    it('o init.', async () => {
        ok(await job.init(['undefined', '1', '2'],'stdout', undefined, './dist/app/FakeJob.js'));
    });

    it('o increment.', () => {
        strictEqual(job.incrementFilesProcessed(), 2);
        strictEqual(job.incrementFilesProcessed(), 3);
    });
});