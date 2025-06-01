import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/imageParse',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/imageParse',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/imageParse',
    method: 'put',
    data
  })
}

export function listImageParse() {
  return request({
    url: 'api/imageParse/listImageParse',
    method: 'get'
  })
}

export default { add, edit, del ,listImageParse}
