const nodemailer = require("nodemailer");
export const sendEmail =async({to,subject,html}:{to:string,subject:string,html:string})=>{
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'anthony.kertzmann@ethereal.email',
        pass: 'BRYAYa7tq9s3n8cskD'
    }
});
let message = {
    from: 'mostafa <mostafa@gmail.com>',
    to,
    subject,
    html
};

// async..await is not allowed in global scope, must use a wrapper
async function main() {

  // send mail with defined transport object
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

await main()
}