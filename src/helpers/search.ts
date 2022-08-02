import Imap from "imap";
import {Options} from "../getEmails";

export function search(imap: Imap, options: Options): Promise<number[]> {
  return new Promise((resolve, reject) => {
    imap.search(options.criteria, (err, uids) => {
      if (err) {
        return reject(err);
      }
      resolve(uids);
    });
  });
}
