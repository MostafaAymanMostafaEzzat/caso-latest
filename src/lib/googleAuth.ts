const {google} = require('googleapis');
const nodeCrypto = require('crypto');

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/oauth2/redirect/google`
);


const state = nodeCrypto.randomBytes(32).toString('hex'); 


