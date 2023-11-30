import axios from 'axios';
let localEndPoint = '//localhost:' + 8080;

if (typeof window !== 'undefined') {
  localEndPoint = '/';
}

const getCommonInterceptors = urlEndPoint => {
  let customAxios = axios.create({
    baseURL: urlEndPoint,
  });

  // customAxios.interceptors.request.use(async request => {
  //   try {
  //     await users.Auth.currentSession();
  //   } catch {
  //     console.log('Issue in ServiceInterceptor for refreshing user token');
  //   }
  //   return request;
  // });

  // customAxios.interceptors.response.use(response => {
  //   const status = response.status;
  //   if (status >= 400 && status < 600) {
  //     console.error('FE Error Log : ', response);
  //   }
  //   return response;
  // });

  return customAxios;
};
export const ServiceAxios = getCommonInterceptors(localEndPoint);
