import request from './request';

export function login(data) {
  return request({
    url: 'auth/login',
    method: 'POST',
    data
  })
}

export function register(data) {
  return request({
    url: 'auth/register',
    method: 'POST',
    data
  })
}

export function getProfile() {
  return request({
    url: '/auth/profile',
    method: 'GET',
  })
}

export function updatePassword(data) {
  return request({
    url: '/auth/update-password',
    method: 'POST',
    data
  })
}

export function updateProfile(data) {
  return request({
    url: '/auth/update-profile',
    method: 'POST',
    data
  })
}
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'GET',
  })
}