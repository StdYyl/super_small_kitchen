import { requested } from './axiosed'

export function getAdminList(last=0) {
  return requested(`api/cgi/m0/manager/select?last=${last}`);
}
