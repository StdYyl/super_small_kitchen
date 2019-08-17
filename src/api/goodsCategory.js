import { requested } from './axiosed';
// 用户获取商品列表
export async function getGoodsCategoryList(parentId) {
  var url = 'api/cgi//c/category/list';
  if (parentId !== undefined) {
    url+='?parentId=' + parentId;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员获取某一个商品分类信息
export async function getGoodsCategory(categoryId) {
  var url = 'api/cgi/m/category/detail';
  if (categoryId !== undefined) {
    url+=`?categoryId=${categoryId}`;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员修改某商品分类信息
export async function editGoodsCategory(form) {
  var url = 'api/cgi/m0/category/revise';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员删除某商品分类
export async function delGoodsCategory(form) {
  var url = 'api/cgi/m0/category/remove';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员创建商品分类
export async function addGoodsCategory(form) {
  var url = 'api/cgi/m0/category/create';
  let res = await requested(url,'post',form);
  return res.data;
}
