import Request from "@/utils/axios";

export function handleLogin (data: any) {
  return Request.post('/auth/login', data)
}

export function handleLoginout (data: any) {
  return Request.get('/auth/logout', data)
}

export function getImgLocation (data: any) {
  return Request.get('/captcha/getCutImage', data)
}