import Request from "@/utils/axios";

// 敏感词排行
export function getSingleUserRank (data: any) {
  return Request.post('/statistics/sensitive/single/user/rank', data)
}
export function getSingleCustomerRank (data: any) {
  return Request.post('/statistics/sensitive/single/customer/rank', data)
}

export function getGroupUserRank (data: any) {
  return Request.post('/statistics/sensitive/group/user/rank', data)
}
export function getGroupCustomerRank (data: any) {
  return Request.post('/statistics/sensitive/group/customer/rank', data)
}

export function getSensitiveList (data: any) {
  return Request.post('/statistics/sensitive/list', data)
}

export function getTimeoutList (data: any) {
  return Request.post('/statistics/timeout/list', data)
}

export function getTimeoutSingleRank (data: any) {
  return Request.post('/statistics/timeout/single/rank', data)
}
export function getTimeoutGroupRank (data: any) {
  return Request.post('/statistics/timeout/group/rank', data)
}

