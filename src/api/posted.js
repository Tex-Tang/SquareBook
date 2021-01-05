import request from './request';

export function addItem(data) {
  return request({
    url: '/posted/item/add',
    method: 'POST',
    data
  })
}

export function getItems(params) {
  return request({
    url: '/posted/items',
    method: 'GET',
    params
  })
}

export function getItemById(uuid) {
  return request({
    url: '/posted/item/' + uuid,
    method: 'GET',
  })
}

export function updateItem(data) {
  return request({
    url: '/posted/item/update',
    method: 'POST',
    data
  })
}

export function soldItem(uuid) {
  return request({
    url: '/posted/item/sold',
    method: 'POST',
    data: {
      uuid,
    }
  })
}

export function deleteItem(uuid) {
  return request({
    url: '/posted/item/' + uuid,
    method: 'DELETE',
  })
}

export function activateItem(uuid) {
  return request({
    url: '/posted/item/activate',
    method: 'POST',
    data: {
      uuid,
    }
  })
}

export function deactivateItem(uuid) {
  return request({
    url: '/posted/item/deactivate',
    method: 'POST',
    data: {
      uuid,
    }
  })
}