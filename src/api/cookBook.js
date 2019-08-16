import { requested } from './axiosed';
// 管理员获取菜谱列表
export async function getCookBookList(cookCategoryId) {
  var url = 'api/cgi/cookbook/category/list';
  if (cookCategoryId !== undefined) {
    url+='?parentId=' + cookCategoryId;
  }
  let res = await requested(url);
  return res.data.body;
}

export async function getCookBookCategory(cookCategoryId) {
  var url = 'api/cgi/m/cookbook/category/detail';
  if (cookCategoryId !== undefined) {
    url+=`?cookCategoryId=${cookCategoryId}`;
  }
  let res = await requested(url);
  return res.data.body;
}
