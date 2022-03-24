const sgMail = require('@sendgrid/mail');

async function sendEmail(Toemail, data, id) {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: Toemail,
            from: 'hello.animecafe@gmail.com',
            templateId: id,
            dynamic_template_data: data,
        };
        await sgMail.send(msg);
        return true;
    } catch (error) {
        console.log("error to send an email ", error);
        return false;
    }
}

module.exports = {
    sendEmail
};