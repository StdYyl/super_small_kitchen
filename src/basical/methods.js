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

//时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
