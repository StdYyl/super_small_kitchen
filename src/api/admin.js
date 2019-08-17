import { requested } from './axiosed'

export function getAdminList() {
  return requested('api/cgi/m0/manager/select');
}
