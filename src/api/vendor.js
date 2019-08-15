import { requested } from './axiosed'

export async function vendorApply() {
  let res = await requested('/vendor/apply','POST')
  return res;
}
