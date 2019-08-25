import {fetch, post} from "./http";

export function getSellerList(auditStatus) {
  return fetch('api/cgi/m/seller/select',{
    "auditStatus": auditStatus,
  });
}
