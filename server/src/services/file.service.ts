import { UploadedFile } from "express-fileupload";
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { IFileUploaded } from "../interfaces/file.interface";

class FileService {

    async uploadFile(file: UploadedFile, dir?: string): Promise<IFileUploaded> {

        const { mimetype, name } = file;

        let type = this.getType(mimetype);
        let dirPath =  this.getDirPath(type, dir);
        const extension = name.split('.').pop();

        if(!fs.existsSync(dirPath)) 
            await this.createDir(dirPath);

        const fileName = `${v4()}.${extension}`;
        const filePath = path.join(dirPath, fileName);

        file.mv(filePath);

        return {filePath, fileName};
    }

    async removeFile(filePath: string): Promise<void> {
        try {
            fs.rm(filePath, (err) => {
                if(err)
                    throw err;
            });
        } catch(e) {
            console.log(e);
        }
    }

    async createDir(dirPath: string): Promise<string> {
        return new Promise((res, rej) => {
            fs.mkdir(dirPath, {recursive: true}, (err) => {
                if(err)
                    throw Error('Make dir error');

                res(dirPath);
            })
        });
    }

    private getType(mimetype: string): string {
        let type = mimetype.split('/').shift();
        if(type !== 'image' && type !== 'video') type = 'document';
        return type;
    }

    private getDirPath(type: string, dir?: string): string {
        let dirPath =  path.resolve(__dirname, '..', '..', 'public');
        if(dir) dirPath = path.join(dirPath, dir);
        else {
            dirPath = path.join(dirPath, type);
        }
        return dirPath;
    }

}

export default new FileService;