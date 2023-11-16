// @filename: BasicFTPClient.ts

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

import { Client as FtpClient } from "basic-ftp";
import { CouldNotConnect } from "./error/CouldNotConnect.js";
import { FTPClient } from "./FTPClient.js";
import { statSync } from "node:fs";

/** The Ftp client adapter that uses the basic-ftp library. */
export class BasicFTPClient implements FTPClient {
    
    /** Protected constructor. */
    private constructor(readonly client: FtpClient) {
    }

    /**
     *  Connect the BasicFtpClient to some host.
     *  @param { string } host - The host connection string.
     *  @returns { BasicFTPClient }
     */
    static async connect(host: string) {
        const client = new FtpClient();
        try {
            await client.access({
                host: host
            });
            return new BasicFTPClient(client)
        } catch (error) {
            CouldNotConnect.exception()
        }
    }

    /**
     *  List all files of some dir in the FTP.
     *  @param { string } path - List all files in some FTP directory.
     *  @returns { Promise<FileInfo[]> }
     */
    async list(path: string = '/') {
        return await this.client.list(path)
    }

    /**
     *  Downloads some file of the FTP.
     *  @param { string } dest - The location to save the file.
     *  @param { string } from - The name of the file to be downloaded of the FTP.
     *  @returns { Promise<FTPResponse> }
     */
    async download(dest: string, from: string) {
        try {
            statSync(dest);
            return
        } catch(error: any) {
            return await this.client.downloadTo(dest, from)
        }
    }

    /**
     *  Closes the FTP connection.
     */
    close() {
        this.client.close()
    }
}
