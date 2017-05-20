import axios from 'axios';

console.log("axios - index.js")

export const HTTP = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('id_token')
	}
})

HTTP.interceptors.request.use(function (config) {
    console.log("intercepted - request - sucess")
    if(localStorage.getItem('id_token') === null){
    	console.log("intercepted - request - NO TOKEN")
    }
    return config;
  	}, function (error) {
    	console.log("intercepted - request - error")
    return Promise.reject(error);
});

 HTTP.interceptors.response.use(function (response) {
    console.log("intercepted - response - sucess")
    if(localStorage.getItem('id_token') === null){
    	console.log("intercepted - response - NO TOKEN")
    }
    return response;
  }, function (error) {
    console.log("intercepted - response - error")
    return Promise.reject(error);
});
