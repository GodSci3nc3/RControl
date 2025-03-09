const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rosalesvelazquezarturo@gmail.com",
        pass: "yqpj kdjv blza nzyn "
    }
});

module.exports = transporter;
