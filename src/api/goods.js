import {fetch, post} from "./http";

export function getGoodsList(data) {
  return fetch('api/cgi/m/goods/select', data);
}

export function getGoodsDetail(data) {
  return fetch('api/cgi/m2/goods/detail', data);
}
