import Request from "@/utils/axios";

export function handleLogin (data: any) {
  return Request.post('/api/login', data)
}

export function getImgLocation (data: any) {
  return Request.get('/captcha/getCutImage')
}