import Imap from "imap";
import {Header} from "../models/Header";
import {streamToString} from "../utils/streamToString";

export function getHeaders(imap: Imap, uids: number[]) {
  return new Promise<Header[]>((resolve, reject) => {
    let promises: Promise<Header>[] = [];
    const f = imap.fetch(uids, {
      bodies: 'HEADER.FIELDS (TO FROM SUBJECT DATE CONTENT-TYPE)'
    });

    f.on('message', function (msg, seqNo) {
      msg.on('body', function (stream, info) {
        promises.push(
          streamToString(stream)
            .then(data => {
              return Imap.parseHeader(data);
            })
            .then(it => {
              return {
                uid: uids[seqNo - 1],
                date: new Date(it['date'][0]),
                subject: it['subject'][0],
                from: it['from'][0],
                to: it['to'],
                contentType: it['content-type'][0]
              };
            })
        );
      });
      msg.once('end', function () {
      });
    });
    f.once('end', function () {
      Promise.all(promises)
        .then(resolve)
        .catch(reject);
    });
  });
}
