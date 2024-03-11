import Request from "@/utils/axios";
// 用户管理
export function getList (data: any) {
  return Request.post('/system/user/page/list', data)
}

export function addUser (data: any) {
  return Request.post('/system/user/add', data)
}

export function deleteUser (data: any) {
  return Request.post('/system/user/delete', data)
}

export function editUser (data: any) {
  return Request.post('/system/user/edit', data)  // userId
}

export function getUser (data: any) {
  return Request.post('/system/user/page/get', data)
}

// 角色管理
export function getRoleList (data: any) {
  return Request.post('/system/role/list', data)
}

export function getRole (data: any) {
  return Request.post('/system/role/get', data)
}

export function editRole (data: any) {
  return Request.post('/system/role/edit', data) // roleId
}

export function deleteRole (data: any) {
  return Request.post('/system/role/delete', data)
}

export function addRole (data: any) {
  return Request.post('/system/role/add', data)
}

// 菜单
export function getMenuList (data: any) {
  return Request.get('/system/user/getRouters', data)
}