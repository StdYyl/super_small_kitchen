import {fetch, post} from "./http";

export function getOrderList() {
  return fetch('api/cgi/m/order/select');
}
