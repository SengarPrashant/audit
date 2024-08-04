import axios from 'axios';
import {userStore, commonStore} from '../stores/common';

// https://dev-039l3tyhnsdnp40.api.raw-labs.com/mock/menu

 const apiUrl = 'https://dev-039l3tyhnsdnp40.api.raw-labs.com/mock/';
// const apiUrl =  'https://localhost:7163'; //'http://localhost:5058'; //
const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8"
  },
});

// Intercept request
instance.interceptors.request.use(req => {
  commonStore.startLoading();
  const token =userStore.token || 'test'
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${userStore.token}`;
  }
  return req;
});

// Intercept response
instance.interceptors.response.use(
  (res) => {
    console.log(res)
    commonStore.stopLoading();
    return res.data
  },
  (err) => {
    commonStore.stopLoading();
    console.debug("interceptors error", err);
    if(err.response.status==500){
        commonStore.showError(["Unable to process your request at the moment."]);
    }else{
        commonStore.showError([err.response.data]);
    }
    return Promise.reject(err);
  }
);

const instance2 = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

instance2.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.debug("interceptors error", err.response);
    return Promise.reject(err);
  }
);

export { instance as http, instance2 as http2 }
export default instance;