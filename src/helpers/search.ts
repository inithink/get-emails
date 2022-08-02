import Imap from "imap";
import {Options} from "../getEmails";

export function search(imap: Imap, options: Options): Promise<number[]> {
  return new Promise((resolve, reject) => {
    let criteria: any[] = ['ALL'];

    criteria.push(['SINCE', options.since || 10 * 60 * 1000]);

    imap.search(criteria, (err, uids) => {
      if (err) {
        return reject(err);
      }
      resolve(uids);
    });
  });
}
