import {fetch, post} from "./http";

export function getWaresList() {
  return fetch('api/cgi/m1/wares/select');
}

export function deleteWares(waresId) {
  return post('api/cgi/m1/wares/remove', {
    "waresId": waresId,
  });
}

export function createWares(data) {
  return post('api/cgi/m1/wares/create', data);
}

export function reviseWares(data) {
  return post('api/cgi/m1/wares/revise', data);
}

export function getWaresDetail(data) {
  return fetch('api/cgi/m/wares/detail', data);
}
