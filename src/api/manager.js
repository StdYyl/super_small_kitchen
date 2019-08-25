import {fetch, post} from "./http";

export function login(data) {
  return post('api/cgi/manager/login', data);
}

export function loginOut() {
  return post('api/cgi/manager/logout');
}
