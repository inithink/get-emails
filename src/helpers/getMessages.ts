import Imap from "imap";
import {Header} from "../models/Header";
import {Message} from "../models/Message";
import {streamToString} from "../utils/streamToString";

const parse = require('parse-email');

export function getMessages(imap: Imap, headers: Header[]): Promise<Message[]> {
  return new Promise((resolve, reject) => {
    const f = imap.fetch(headers.map(it => it.uid), {bodies: ''});
    let result: Promise<Message>[] = [];
    let index = 0;
    f.on('message', function (msg, seqNo) {
      let header = headers[index++];
      msg.on('body', function (stream) {
        result.push(
          streamToString(stream)
            .then(data => {
              return parse(data);
            })
            .then(result => {
              return {
                header,
                html: result.html,
                text: result.text,
              };
            })
        );
      });
    });
    f.once('error', function (err) {
      reject(err);
    });
    f.once('end', function () {
      Promise.all(result)
        .then(resolve)
        .catch(reject);
    });
  });
}
