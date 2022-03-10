const sgMail = require('@sendgrid/mail')

function sendMail (mailTo) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: mailTo, // Change to your recipient
  from: 'maxiconstancio@hotmail.com', // Change to your verified sender
  subject: 'Thanks for your registration!',
  text: 'Este email fue generado por la API de Disney',
  html: `<strong>Hola ${mailTo} </strong>`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })


}

module.exports = sendMail;