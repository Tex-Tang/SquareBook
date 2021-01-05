import request from './request';

export function getItems(params) {
  return request({
    url: '/items',
    method: 'GET',
    params
  })
}

export function getItemById(uuid) {
  return request({
    url: '/item/' + uuid,
    method: 'GET',
  })
}

export function getContact(method, uuid) {
  return request({
    url: '/item/contact/' + method + '/' + uuid,
    method: 'GET',
  })
}
