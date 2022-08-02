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
  since: new Date(Date.now() - 1000),
  filterByHeader: header => header.subject.indexOf('[AuthKey] ') !== -1
};

getEmails(options)
  .then(console.log)
  .catch(console.error);
