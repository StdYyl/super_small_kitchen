import axios from 'axios';

export function requested(url,method='get',data,config){
  return axios({ method, url, data, config, timeout: 6000 });
}

axios.interceptors.response.use((res) => {
  return res;
},err=>{
  console.log(err)
})
