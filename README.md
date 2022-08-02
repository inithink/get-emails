# Installation
```bash
npm install @inithink/get-emails
```

# Examples
```typescript
import {getEmails, Options} from "./getEmails";

let options: Options = {
  imap: {
    user: 'test@test.com',
    password: 'MyTestPassword',
    host: 'imap.test.com',
    port: 993,
    tls: true,
  },
  since: new Date(Date.now() - 10 * 60 * 1000), // [Optional] default: 10 minutes
  filterByHeader: header => header.subject.indexOf('[AuthKey] ') !== -1,  // [Optional] default: pass all 
};

getEmails(options)
  .then(console.log)
  .catch(console.error);

```
