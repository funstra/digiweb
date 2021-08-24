const nodemailer = require('nodemailer')
const handler = async (event) => {
    const emailPattern = /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/

    try {
        const data = JSON.parse(event.body)
        if (emailPattern.test(data.email)) {
            const transporter = nodemailer.createTransport({
                host: "digimoon.space",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.CONTACT_FORM_EMAIL,
                    pass: process.env.CONTACT_FORM_PWD
                }
            })
            console.log({ job: 'job@digimoon.space', contact: 'contact@digimoon.space' }[data.to])
            const info = await transporter.sendMail({
                from: data.email,
                to: { job: 'jobs@digimoon.space', contact: 'contact@digimoon.space' }[data.to],
                subject: data.subject || 'no subject',
                text: data.body
            })
            console.log(info.accepted)
            if ((info).accepted) {
                console.log((info).messageId)
                console.log((info).accepted)
                const status = (info).response
                console.log(status)
                return {
                    statusCode: 250,
                    body: JSON.stringify({ statusCode: 250, message: `Email sent!` }),
                }
            } else if ((info).rejected) {
                console.log('here')

                const status = (info).response
                console.log(status, "transport rejected")
                return {
                    statusCode: 500,
                    body: JSON.stringify({ statusCode: 500, message: `Email not sent!` }),
                }
            }

        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ statusCode: 400, message: `Not a valid email` }),
            }
        }

    }
    catch (error) {
        console.log('WHAT')
        console.log(error.response)
        return {
            statusCode: 500,
            body: JSON.stringify({ statusCode: 500, message: `Not a valid email`, body: error.toString() })
        }
    }
}

module.exports = { handler }
