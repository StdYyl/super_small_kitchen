import { requested } from './axiosed'

//管理员获取菜谱列表
export async function getCookBookList() {
  let res = await requested('/api/cookbook/category/list');
  return res.data.body;
}

