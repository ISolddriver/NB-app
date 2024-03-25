import Request from "@/utils/axios";

// 菜单
export function getMenuList (data: any) {
  return Request.get('/system/menu/list', data)
}
