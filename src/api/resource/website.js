import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/website',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/website',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/website',
    method: 'put',
    data
  })
}

export function listWebsite() {
  return request({
    url: 'api/website/listWebsite',
    method: 'get'
  })
}

export default { add, edit, del,listWebsite}
