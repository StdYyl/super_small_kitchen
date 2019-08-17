import { requested } from './axiosed';
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

