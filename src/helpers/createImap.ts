import Imap from "imap";

export function createImap(config: Imap.Config): Promise<Imap> {
  return new Promise((resolve, reject) => {
    const imap = new Imap(config);

    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err, box) => {
        if (err) {
          return reject(err);
        }
        resolve(imap);
      });
    });
    imap.once('error', reject);
    imap.connect();
  });
}
