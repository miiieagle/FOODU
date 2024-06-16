// Sending mail with nodemailer
const nodemailer = require('nodemailer');
const { USER, PASSMAILER, SERVICE } = require('../config/envConfig');

const transporter = nodemailer.createTransport({
    service: SERVICE,
    auth: {
        user: USER,
        pass: PASSMAILER,
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
