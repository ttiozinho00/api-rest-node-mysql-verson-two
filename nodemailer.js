const nodemailer = require("nodemailer");

exports.sendEmail = () => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: "emailEmpresa",
            pass: "senhaEmpresa"
        }
    })

    let mailOptions = {
        from: 'from_address@example.com',
        to: 'emailcliente',
        subject: 'Test Email Subject',
        html: '<h1>Contrato Criado com sucesso</h1>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}