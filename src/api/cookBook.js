import { requested } from './axiosed';
import {fetch, post} from "./http";
// 用户获取菜谱列表
export async function getCookBookList(cookCategoryId) {
  var url = 'api/cgi/cookbook/category/list';
  if (cookCategoryId !== undefined) {
    url+='?parentId=' + cookCategoryId;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员获取某一个菜谱信息
export async function getCookBookCategory(cookCategoryId) {
  var url = 'api/cgi/m/cookbook/category/detail';
  if (cookCategoryId !== undefined) {
    url+=`?cookCategoryId=${cookCategoryId}`;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员修改某菜谱分类信息
export async function editCookBookCategory(form) {
  var url = 'api/cgi//m0/cookbook/category/revise';
  if (form !== undefined) {
    url+=`?cookCategoryId=${cookCategoryId}`;
  }
  let res = await requested(url,'post');
  return res.data.body;
}

export function selectCookBookList(data) {
  return fetch('api/cgi/m/cookbook/select', data);
}

export function removeCookBook(data) {
  return post('api/cgi/m/cookbook/remove', data);
}

export function getCookBookDetail(data) {
  return fetch('api/cgi/m/cookbook/detail', data);
}

export function reviseCookBook(data) {
  return post('api/cgi/m/cookbook/revise', data);
}

export function createCookBook(data) {
  return post('api/cgi/m/cookbook/create', data);
}
