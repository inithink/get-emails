import Imap from "imap";
import {Header} from "./models/Header";
import {search} from "./helpers/search";
import {createImap} from "./helpers/createImap";
import {getHeaders} from "./helpers/getHeaders";
import {getMessages} from "./helpers/getMessages";


export interface Options {
  imap: Imap.Config,
  criteria: any[],
  filterByHeader?: (header: Header) => boolean
}

export async function getEmails(options: Options) {
  let conn = await createImap(options.imap);
  let uids = await search(conn, options);

  if (uids.length === 0) {
    return [];
  }

  let headers = await getHeaders(conn, uids);
  if (options.filterByHeader) {
    headers = headers.filter(options.filterByHeader);
  }
  if (headers.length === 0) {
    return [];
  }
  let result = await getMessages(conn, headers);
  conn.destroy();
  return result;
}


