import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/characterReplaceRule',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/characterReplaceRule',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/characterReplaceRule',
    method: 'put',
    data
  })
}

export function getCharacterReplaceRule(id) {
  return request({
    url: 'api/characterReplaceRule/getCharacterReplaceRule?id='+id,
    method: 'get'
  })
}
export function updateStatus(id) {
  return request({
    url: 'api/characterReplaceRule/updateStatus?id='+id,
    method: 'put'
  })
}

export default { add, edit, del ,getCharacterReplaceRule,updateStatus}
