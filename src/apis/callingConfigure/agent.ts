import Request from '@/utils/axios'

// 坐席列表
export function getList(data: any) {
  return Request.post('/system/v1/agent/page/list', data)
}

// delete坐席
export function deleteAgent(data: any) {
  return Request.post('/system/v1/agent/delete', data)
}
