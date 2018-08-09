import request from '@/utils/request'

// 获取搜索框lable
export function getLabelList(params) {
  return request({
    url: '/labelList',
    method: 'get',
    params
  })
}

// 获取商品列表axios
export function getCommodityList(params) {
  return request({
    url: '/tableCommodity',
    method: 'get',
    params
  })
}