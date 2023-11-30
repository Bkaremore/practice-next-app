import axios from 'axios';
import {API} from '../config/development';
const APIGoServer = API.GO_SERVER;
const getCommonInterceptors = urlEndPoint => {
  let customAxios = axios.create({
    baseURL: urlEndPoint,
  });

  return customAxios;
};

export const GOAxios = getCommonInterceptors(APIGoServer);
export const addressAxios = getCommonInterceptors(`${APIGoServer}/location/v1`);
