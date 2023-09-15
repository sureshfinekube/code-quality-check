import { s3 } from "../../config/aws-s3";

export class S3ImageUpload {

    static upload(directory: string, fileName: string, file: any) {
        return new Promise((resolve, reject) => {

            // Binary data base64
            const fileContent = Buffer.from(file.data, 'binary');

            var params = {
                Bucket: 'wimos-user',
                Key: directory + fileName,
                Body: fileContent
            };

            // Uploading files to the bucket
            s3.upload(params, function (err: any, data: any) {
                if (err) {
                    console.log('error==in==aws',err)
                    reject(err);
                }
                console.log("data: ", data);
                resolve(0);
            });


        })

    };

}