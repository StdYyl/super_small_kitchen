import axios from 'axios';

export function requested(url,method='get'){
  return axios({ method, url, timeout: 6000 });
}

axios.interceptors.response.use((res) => {
  return res;
},err=>{
  console.log(err)
})
