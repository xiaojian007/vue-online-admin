import request from '@/utils/request'

export function login(username, password) {
  // console.log(request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // }))
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  console.log(request({
    url: '/user/logout',
    method: 'post'
  }))
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getLabelList(params) {
  return request({
    url: '/labelList',
    method: 'get',
    params
  })
}
// 获取label列表axios
// export const getLabelList = params => {
//   return instance.get(`/api/labelList`, params)
// }
