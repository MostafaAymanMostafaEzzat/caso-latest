const {google} = require('googleapis');
const nodeCrypto = require('crypto');

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
    `http://localhost:3000/api/oauth2/redirect/google`
);


const state = nodeCrypto.randomBytes(32).toString('hex'); 


