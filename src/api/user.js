import {fetch, post} from "./http";

export function getUserList(data) {
  return fetch('api/cgi/m/user/select', data);
}
