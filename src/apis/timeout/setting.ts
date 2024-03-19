import Request from "@/utils/axios";

export function getRuleList (data: any) {
  return Request.post('/rule/list', data)
}

export function addRule (data: any) {
  return Request.post('/rule/add', data)
}

export function editRule (data: any) {
  return Request.post('/rule/edit', data) // id
}

export function getRule (data: any) {
  return Request.post('/rule/get', data) // id
}
