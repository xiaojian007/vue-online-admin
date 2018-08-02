import axios from 'axios'

const instance = axios.create({
  headers: {
    // 'content-type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true
})

// 数据导出excel
export const downloadFile = function(res) {
  console.log(res.data)
  var blob = new Blob([res.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  })
  var downloadElement = document.createElement('a')
  var href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  downloadElement.download = 'order_' + (new Date()).valueOf() + '.xlsx' // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}

// 数据导出axios
export const dataExport = params => {
  return instance.post(`/api/exportlist.do`, params, {
    responseType: 'blob'
  }).then(downloadFile)
}

// 获取商品列表axios
export const getCommodityList = params => {
  return instance.get(`/api/tableCommodity`, params)
}

// 获取label列表axios
export const getLabelList = params => {
  return instance.get(`/api/labelList`, params)
}

// 新增axios
export const addUser = params => {
  return instance.post(`/api/addAudiphone.do`, params)
}

// 删除axios
export const removeUser = params => {
  return instance.post(`/api/removeAudiphone.do`, params)
}
