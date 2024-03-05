import Request from "@/utils/axios";

export function getList (data: any) {
  return Request.post('/system/user/page/list', data)
}