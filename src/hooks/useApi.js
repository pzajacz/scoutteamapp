import axios from 'axios';

const BASE_URL = 'https://wallet.webuni.workers.dev/';
export const AXIOS_METHOD = {
  'GET': 'GET',
  'POST': 'POST',
  'PUT': 'PUT'
};

let authToken = false;

export function  setApiToken(newToken) {
  authToken = newToken;
}

export function doApiCall(method, uri, onSuccess, onFailure= false, data = {}) {
/*  let axiosCall = method === AXIOS_METHOD.POST ? axios.post : axios.get;
  axiosCall(`${BASE_URL}${uri}`).then(res => {
    res.data;
  })*/
  console.log('axios start');
  axios({
    method,
    url: `${BASE_URL}${uri}`,
    data,
    headers: authToken !== false ? {'Authtoken': `Bearer ${authToken}`} : null
  }).then(res=> {
    console.log(res.data);
    onSuccess(res.data);
  }).catch(err=> {
    console.log(err);
    if(onFailure === false){
      return
    }
    onFailure(err?.response?.data.error, err);
  })
}



