import {sendEmail} from './sendEmail';

export const sendResetPasswordEmail = async ({email,verificationToken,origin}:{email:string,verificationToken:string,origin:string})=>{

const URL = `${origin}/auth/reset-password?verificationToken=${verificationToken}&email=${email}`;
const message= `<p>Please reset password by clicking on the following link : 
<a href="${URL}">Reset Password</a></p>`;

return sendEmail({
     to:email,
     subject:'Reset Password',
     html:`<h4>hello</h4>
     ${message}`
})

}
