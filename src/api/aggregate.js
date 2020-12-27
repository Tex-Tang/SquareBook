import request from './request';

export function getCategories() {
  return request({
    url: '/categories',
    method: 'GET',
  })
}

export function getAllPlaces() {
  return request({
    url: '/places/all',
    method: 'GET',
  })
}

export function getActivePlaces() {
  return request({
    url: '/places/active',
    method: 'GET',
  })
}
