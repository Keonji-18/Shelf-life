import cron from 'node-cron';
import nodemailer from 'nodemailer';
import {env} from "../config";
import {userRepo} from "../repo/user.repo";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
});
async function sendScheduledEmail(toMail: string) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toMail,
        subject: 'Checkout Your Household 🚀',
        text: 'Come Visit Your Household check inventory to Avoid Wastage',
        html: '<h1>Household</h1><p>This is a email to remind you to visit household.</p>'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[${new Date().toISOString()}] Email sent successfully: ${info.response}`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error sending email:`, error);
    }
}

const emails = await userRepo.getAllUsersEmails()

export const sendEmailTask = cron.schedule('0 9 * * 1', async () => {
    console.log('Running scheduled email task...');
    emails.forEach(email => {
        sendScheduledEmail(email.email)
    })
});
