import Request from "@/utils/axios";

// 获取员工列表
export function getUserList (data: any) {
  return Request.post('/chatMsg/user/list', data)
}
// 获取群聊列表
export function getRoomList (data: any) {
  return Request.post('/chatMsg/room/list', data)
}
// 获取客户列表
export function getCustomerList (data: any) {
  return Request.post('/chatMsg/customer/list', data)
}


// 存档范围
export function getPermitList (data: any) {
  return Request.post('/permit/list', data)
}
export function updatePermit (data: any) {
  return Request.post('/permit/updateStatus', data)
}
export function syncPermit (data: any) {
  return Request.post('/permit/sync', data)
}
export function deletePermitItem (data: any) {
  return Request.post('/permit/delete', data)
}