import Request from "@/utils/axios";

// 敏感词排行
export function getSingleUserRank (data: any) {
  return Request.post('/statistics/sensitive/single/user/rank', data)
}
export function getSingleCustomerRank (data: any) {
  return Request.post('/statistics/sensitive/single/customer/rank', data)
}