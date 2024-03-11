export function setLocalStorage(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function getLocalStorage(key: string) {
  const value:any = window.localStorage.getItem(key);
  return value ?? ''
}

export function setLoginInfo(value: string) {
  setLocalStorage('page-login-info', value);
}

export function getLoginInfo() {
  return getLocalStorage('page-login-info');
}

export function setToken(value: string) {
  setLocalStorage('niubee-token', value);
}

export function getToken() {
  return getLocalStorage('niubee-token');
}