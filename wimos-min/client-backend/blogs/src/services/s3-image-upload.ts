import { s3 } from "../config/aws";

export class S3BlogImageUpload {

    static upload(directory: string, fileName: string, file: any) {
        return new Promise((resolve, reject) => {


            // Binary data base64
            const fileContent = Buffer.from(file.data, 'binary');

            var params = {
                Bucket: 'wimos-client-1',
                Key: directory + fileName,
                Body: fileContent
            };

            // Uploading files to the bucket
            s3.upload(params, function (err: any, data: any) {
                if (err) {
                    reject(err);
                }
                resolve(0);
            });


        })

    };

}