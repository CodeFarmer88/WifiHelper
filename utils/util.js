const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const _toastError = error => {
  wx.hideToast()
  wx.showToast({
    title: error
  })
}

const _toastSuccess = msg => {
  wx.hideToast()
  wx.showToast({
    title: msg,
    icon: 'success'
  })
}

module.exports = {
  formatTime: formatTime,
  toastError: _toastError,
  toastSuccess: _toastSuccess
}
