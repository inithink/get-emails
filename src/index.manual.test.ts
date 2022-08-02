import {getEmails, Options} from "./getEmails";

require('dotenv').config();

let options: Options = {
  imap: {
    user: process.env['IMAP_USER']!,
    password: process.env['IMAP_PASSWORD']!,
    host: process.env['IMAP_HOST']!,
    port: 993,
    tls: true,
  },
  criteria: ['ALL', ['HEADER', 'FROM', 'admin@11st.co.kr']]
};


getEmails(options)
  .then(console.log)
  .catch(console.error);


