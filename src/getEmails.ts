import Imap from "imap";
import {Header} from "./models/Header";
import {search} from "./helpers/search";
import {createImap} from "./helpers/createImap";
import {getHeaders} from "./helpers/getHeaders";
import {getMessages} from "./helpers/getMessages";


export interface Options {
  imap: Imap.Config,
  since?: Date;
  filterByHeader?: (header: Header) => boolean
}

export async function getEmails(options: Options) {
  let conn = await createImap(options.imap);
  let uids = await search(conn, options);
  let headers = await getHeaders(conn, uids);
  if (options.filterByHeader) {
    headers = headers.filter(options.filterByHeader);
  }
  return await getMessages(conn, headers);
}


