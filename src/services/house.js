import request from '../utils/request';
import {houseApi} from '../utils/api';

export function getHouse(params) {
  return request({methods: 'get', url: houseApi.getDetail, data: params});
}
