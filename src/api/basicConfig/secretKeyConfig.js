import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/secretKey',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/secretKey',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/secretKey',
    method: 'put',
    data
  })
}

export function getStoreTheme(id) {
  return request({
    url: 'api/storeTheme/getStoreTheme?id='+id,
    method: 'get'
  })
}

export default { add, edit, del ,getStoreTheme}
