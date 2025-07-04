import {sendEmail} from './sendEmail';

export const sendVerificationEmail = async ({email,verificationToken,origin}:{email:string,verificationToken:string,origin:string})=>{
console.log('email')
console.log(email)

const URL =`${origin}/auth/verify-email?verificationToken=${verificationToken}&email=${email}`
const message=`<p>Please confirm your email by clicking on the following link : 
<a href="${URL}">Verify Email</a> </p>`;
console.log(URL)
return sendEmail({
     to:email,
     subject:'Email Confirmation',
     html:`<h4>hello</h4>
     ${message}`
})

}

