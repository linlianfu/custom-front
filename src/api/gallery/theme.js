import request from '@/utils/request'

export function pageTheme(data) {
  return request({
    url: 'api/theme/page',
    method: 'get',
    data
  })
}

export function add(data) {
  return request({
    url: 'api/theme',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/theme',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/theme',
    method: 'put',
    data
  })
}

export default { pageTheme,add, edit, del }
