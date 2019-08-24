import { requested } from './axiosed';
// 管理员获取通知列表
export async function getNotificationList(form) {
  var url = 'api/cgi/m0/notification/select';
  if (form) {
    url+='?search='+form.search+'&last='+form.last+'&rows='+form.rows;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员获取某一个通知信息
export async function getNotification(notificationId) {
  var url = 'api/cgi/m0/notification/detail';
  if (notificationId !== undefined) {
    url+=`?notificationId=${notificationId}`;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员修改某通知信息
export async function editNotification(form) {
  var url = 'api/cgi/m0/notification/revise';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员删除某通知
export async function delNotification(form) {
  var url = 'api/cgi/m0/notification/remove';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员创建通知
export async function addNotification(form) {
  var url = 'api/cgi/m0/notification/create';
  let res = await requested(url,'post',form);
  return res.data;
}
