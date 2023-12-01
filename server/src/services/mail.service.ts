import nodemailer from 'nodemailer';

class MailService {

    static transporter: nodemailer.Transporter;

    constructor() {
        try {
            if(!MailService.transporter) MailService.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: +process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
        } catch(e) {
            console.log(`Create nodemailer transport error`);
        }
    }

    async sendVerfificationMessage(to: string, code: string): Promise<void> {
        const html = `
        <p>Account verification code - ${code}</p>
        `;

        return this.sendMail(to, `Confirm your account on - ${process.env.APP_NAME}`, html)
    }

    async sendMail(to: string, subject: string, html: string): Promise<void> {
        try {
            return await MailService.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject,
                html
            });
        } catch(e) {
            console.log(`Send message err`);
        }
    }

}

export default new MailService;