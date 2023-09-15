// let nodemailer = require('nodemailer');
// let smtpTransport = require('nodemailer-smtp-transport');

const sgMail = require('@sendgrid/mail')
// import AWS from 'aws-sdk';

// const API_KEY = "9308eb085763ae3179ed90f6b1775481-02fa25a3-99ca1da4"
// const DOMAIN = 'sandboxed9e8b75e5e34671884f9f38abc34231.mailgun.org';


// import mailgun from 'mailgun-js';

// const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

export class MailGun {

    // static emailData(email: string, randomKey: string) {

    //     return {
    //         from: 'wimoos <wimoose@communiqo.dev>',
    //         to: email,
    //         subject: 'Have you Signed up for wimoos?',
    //         text: `Your OTP is: ${randomKey}`
    //     }
    // }

    // static sendMessage(email: string) {

    //     // Generating random 6 number
    //     let randomKey: string = "" + betweenRandomNumber(100000, 999999);

    //     let data = this.emailData(email, randomKey);

    //     return new Promise<OtpInterface>(function (resolve, reject) {

    //         mg.messages().send(data, function (error, body) {
    //             if (error) reject({ status: false, otp: "" });
    //             if (!error) resolve({ status: true, otp: randomKey })
    //         });

    //     });

    // }
    static sendMessage(email: string) {
        return new Promise<OtpInterface>(function (resolve, reject) {

            //let randomSixDigitCode = Math.floor(100000 + Math.random() * 900000);\\

            // Sending email using nodemailer
            // let transporter = nodemailer.createTransport(smtpTransport({
            //     service: 'gmail',
            //     host: 'smtp.gmail.com',
            //     auth: {
            //         user: 'cloud@communiqo.com',
            //         pass: 'cloud@2022'
            //     }
            // }));

            // let mailOptions = {
            //     from: 'cloud@communiqo.com',
            //     to: email,
            //     subject: 'OTP verifcation || wimos',
            //     text: `${randomSixDigitCode} is your one time verification code from wimos.`
            // };

            // transporter.sendMail(mailOptions, function (error: any, info: any) {
            //     if (error) {
            //         console.log(error);
            //         reject({ status: false, otp: "" })

            //     } else {
            //         console.log('Email sent: ' + info.response);
            //         resolve({ status: true, otp: randomSixDigitCode+'' })
            //     }
            // });

            // Sending email using sendgrid
            

            // sgMail.setApiKey('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')

            // const msg = {
            //     to: email, // Change to your recipient
            //     from: 'cloud@communiqo.com', // Change to your verified sender
            //     subject: 'OTP Verification',
            //     text: 'OTP Verification',
            //     html: `<strong>${randomSixDigitCode} is your one time verification code from wimos</strong>`,
            // }

            // sgMail
            //     .send(msg)
            //     .then(() => {
            //         console.log('Email sent')
            //         resolve({ status: true, otp: randomSixDigitCode+'' })
            //     })
            //     .catch((error: any) => {
            //         console.error(error)
            //         reject({ status: false, otp: "" })
            //     })


            //######## sendinblue ##########\
            // const SibApiV3Sdk = require('sib-api-v3-typescript');
 
            // let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

            // let apiKey = apiInstance.authentications['apiKey'];
            // apiKey.apiKey = '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';

            // let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 

            // sendSmtpEmail.subject = "OTP Verification";
            // sendSmtpEmail.to = [{"email":email}];
            // // sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
            // // sendSmtpEmail.bcc = [{"name":"John Doe","email":"example@example.com"}];
            // // sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
            // // sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
            // sendSmtpEmail.templateId = 1
            // sendSmtpEmail.params = {"otp":randomSixDigitCode+''};

            // apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data: any) {
            //     console.log('API called successfully.');
            //     resolve({ status: true, otp: randomSixDigitCode+'' })
            // }, function(error: any) {
            //     console.error(error);
            //     reject({ status: false, error})
            // });



            // ==================== aws ses ================== \\
            // let nodemailer = require("nodemailer");
            // let aws = require("@aws-sdk/client-ses");
            // let { defaultProvider } = require("@aws-sdk/credential-provider-node");

            // const ses = new aws.SES({
            //     apiVersion: "2010-12-01",
            //     region: "us-east-1",
            //     defaultProvider,
            // });

            // // create Nodemailer SES transporter
            // let transporter = nodemailer.createTransport({
            // SES: { ses, aws },
            // });

            // // send some mail
            // transporter.sendMail(
            // {
            //     from: "sender@example.com",
            //     to: "recipient@example.com",
            //     subject: "Message",
            //     text: "I hope this message gets sent!",
            //     ses: {
            //     // optional extra arguments for SendRawEmail
            //     Tags: [
            //         {
            //         Name: "tag_name",
            //         Value: "tag_value",
            //         },
            //     ],
            //     },
            // },
            // (err: any, info: any) => {
            //     console.log(info.envelope);
            //     console.log(info.messageId);
            // }
            // );

            // AWS.config.update({ region: 'us-east-1' });

            // AWS.SES

            // let params = {
            //     Destination: {
            //       /* required */
            //       ToAddresses: ["email", /* more items */ ]
            //     },
            //     Message: {
            //       /* required */
            //       Body: {
            //         /* required */
            //         Html: {
            //           Charset: "UTF-8",
            //           Data: `<h3>Hi $\{name\}!</h3><br/>
            //   <p>Your OTP for Something Something Service Hub is:<em> $\{otp\}</em>
            //   </p><br/>
            //   <p>Regards,<br/>
            //   Something Something Service Hub Team</p>
            //   `
            //         },
            //         Text: {
            //           Charset: "UTF-8",
            //           Data: `Hi  $\{name\}!Your Login OTP is $\{otp\}`
            //         }
            //       },
            //       Subject: {
            //         Charset: 'UTF-8',
            //         Data: `$\{otp\} is the  OTP for Something Something Service Hub!`
            //       }
            //     },
            //     Source: "fromEmail",
            //     /* required */
            //     ReplyToAddresses: ["fromEmail", /* more items */ ],
            //   };

            //   var sendPromise = new AWS.SES({
            //     apiVersion: ‘2010– 12– 01’
            //   })
            //   .sendEmail(params)
            //   .promise();

            // const nodemailer = require('nodemailer')

            // let transporter  = nodemailer.createTransport({
            //     host: "email-smtp.us-west-2.amazonaws.com",
            //     port: 465,
            //     secure: true, // upgrade later with STARTTLS
            //     auth: {
            //       user: "AKIA2K6PY22KKR7X6VPD",
            //       pass: "BJ8bOR9EuqUzYTGdfpKpQI1AfHSMZbxFKdCjHYwIUE2a",
            //     },
            // });

            // transporter.sendMail({
            //     from: "info@wimos.io", // verified sender email
            //     to: email, // recipient email
            //     subject: "Testing wimos otp", // Subject line
            //     text: "HI, this is a test from me", // plain text body
            //     html: "<b>Helooooooooo</b>", // html body
            //   }, function(error: any, info: any){
            //     if (error) {
            //       console.log('smtp-error',error);
            //     } else {
            //       console.log('Email sent: ' + info.response);
            //     }
            // });





            resolve({ status: true, otp: '123456' })
            
        })

    };
}

interface OtpInterface {
    otp: string;
    status: boolean;
};

function betweenRandomNumber(min: number, max: number): number {

    return Math.floor(

        Math.random() * (max - min + 1) + min

    )

};
