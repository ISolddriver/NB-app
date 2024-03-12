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
