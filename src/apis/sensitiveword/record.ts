import Request from "@/utils/axios";

// 单聊敏感词列表
export function getSingleList (data: any) {
  return Request.post('/sensitive/record/single/list', data)
}

// 群聊敏感词列表
export function getGroupList (data: any) {
  return Request.post('/sensitive/record/group/list', data)
}

// 敏感词列表
export function getList (data: any) {
  return Request.post('/sensitive/list', data)
}
export function getDetail (data: any) {
  return Request.post('/sensitive/get', data) // id
}
export function editStatus (data: any) {
  return Request.post('/sensitive/editStatus', data)
}
export function edit (data: any) {
  return Request.post('/sensitive/edit', data) // id
}
export function deleteItem (data: any) {
  return Request.post('/sensitive/delete', data)
}
export function addItem (data: any) {
  return Request.post('/sensitive/add', data)
}


