import request from '@/utils/request'

export function pageStore(data) {
  return request({
    url: 'api/store',
    method: 'get',
    data
  })
}
export function add(data) {
  return request({
    url: 'api/store',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/store',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/store',
    method: 'put',
    data
  })
}

export default { pageStore,add, edit, del }
