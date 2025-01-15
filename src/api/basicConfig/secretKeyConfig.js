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

export function updateStatus(id) {
  return request({
    url: 'api/secretKey/updateStatus?id='+id,
    method: 'put'
  })
}

export default { add, edit, del ,updateStatus}
