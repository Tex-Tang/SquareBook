import request from './request';

export function getItems(params) {
  return request({
    url: '/bought/items',
    method: 'GET',
    params
  })
}

export function getItemById(uuid) {
  return request({
    url: '/bought/item/' + uuid,
    method: 'GET',
  })
}
