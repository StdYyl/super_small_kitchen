// 检验手机号格式
export function checkPhone(phone) {
  return (!/^1[3-9][0-9]{9}$/.test(phone))
}
//检验密码一致性(长度六位以上) 0：正确 1：密码不一致 2：长度不符合
// export function checkPassword(pwd1,pwd2,checkLength) {
//   if(checkLength){
//     if(pwd1.length<6) return 2
//   }
//   if(pwd1 != pwd2) return  1
//   return 0
// }
