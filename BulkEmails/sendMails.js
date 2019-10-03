// Send emails to all IDs in emails.js, content being sample-template.hbs

require('dotenv').config();

// Require handlebars
const hb = require('express-handlebars').create({
    extname: '.hbs',
    partialsDir: '.',
});

// Set up sendgrid API
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const Sendgrid = require('sendgrid')(SENDGRID_API_KEY);

// Require the emails from emails.js
const docs = require('./emails');

// Total number of docs
console.log("Total number: ", docs.length);

// Interval between two mails
const interval = 500;

for (let i = 0; i < docs.length; i++) {

    setTimeout(() => {

        // Call sendEmails function
        sendEmails( docs[i].name, docs[i].email, (err) => {
            if (err) {
                console.error(`Error: ${err}`);
            } else {
                console.log(`${i+1}/${docs.length}: Sent to ${docs[i].email}`);
            }
        });

    }, interval * (i + 1));

}

sendEmails = (name, email, cb) => {

    // File containing the email template
    let fileName = `./sample-template.hbs`;

    // Define the email details
    const mailSubject = `Test Email`;           // Enter mail subject
    const fromName = `CSI-VIT`;                 // Enter from name
    const fromEmail = `tech@csivit.com`         // Enter from email
    const replyToMail = `askcsivit@gmail.com`   // Reply-to email
    const replyToName = `CSI-VIT`               // Reply-to name

    // Add the fields you want to template in the email
    var templateVals = {}
    templateVals.name = name;

    // Render the template and send the mail
    hb.render(fileName, templateVals).then((renderedHtml) => {

        const sgReq = Sendgrid.emptyRequest({

            method: 'POST',
            path: '/v3/mail/send',

            body: {
                personalizations: [{
                    to: [{
                        name: name,
                        email: email
                    }],
                    subject: mailSubject
                }],

                from: {
                    name: fromName,
                    email: fromEmail
                },

                content: [{
                    type: 'text/html',
                    value: renderedHtml
                }],

                replyTo: [{
                    email: replyToMail,
                    name: replyToName
                }],
            }
        });

        Sendgrid.API(sgReq, (err) => {
            if (err) {
                cb(err);
            } else {
                cb(false);
            }
            return;
        });
    });
}
