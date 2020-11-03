const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const key = "verysecretkey";
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: "ssmtp.gmail.com",
    service: 'gmail',
    port: 587,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: process.env.CORREO,
        pass: process.env.PASSWORD
    }
});

const crearEnviarHash = async function(correo) {
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    console.log("****CODIGO OTP****", otp);
    const ttl = 5 * 60 * 1000; //3 Minutes in miliseconds
    const expires = Date.now() + ttl; //timestamp to 3 minutes in the future
    const data = `${correo}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;
    //send_code(phone,otp);
    await send_mail(correo, otp);
    return fullHash;
}
async function send_mail(correo, otp) {
    var mailOptions = {
        from: process.env.CORREO,
        to: correo,
        subject: 'Sending Email from Node.js',
        text: 'Codigo OTP:' + otp
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = {
    crearEnviarHash
}