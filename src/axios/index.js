import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://localhost:8080/'
})

HTTP.interceptors.request.use(function (config) {
    	config.headers['Authorization'] = "Bearer " + localStorage.getItem('id_token')
    	return config
  	}, 
  	function (error) {
    	console.log("intercepted - request - error: " + error)
    	return Promise.reject(error)
});