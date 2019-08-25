import { requested } from './axiosed';
import {fetch, post} from "./http";

export async function vendorApply() {
  let res = await requested('/vendor/apply','POST')
  return res;
}

export function getVendorList(auditStatus) {
  return fetch('api/cgi/m0/vendor/select',{
    "auditStatus": auditStatus,
  });
}
