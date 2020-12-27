import request from './request';

export function getItems(params) {
  return request({
    url: '/sold/items',
    method: 'GET',
    params
  })
}

export function getItemById(uuid) {
  return request({
    url: '/sold/item/' + uuid,
    method: 'GET',
  })
}
