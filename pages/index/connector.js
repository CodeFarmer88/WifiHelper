const app = getApp()
const util = require('../../utils/util.js')
const connectSuccessMessage = "连接成功"
const connectFailMessage = "连接失败"
const errQRCodeMessage = "无效的二维码"
const wifiInitFailMessage = "wifi模块初始化失败"
//启动wifi连接前先启动wifi模块
function _startConnecting(wifi) {
  app.startWiFi(function() {
    connectWiFi(wifi)
  })
}
//连接指定wifi热点
function connectWiFi(wifi) {
  var wifiInfo = JSON.parse(wifi)
  if (!wifiInfo || !wifiInfo.SSID || !wifiInfo.BSSID || !wifiInfo.PASSWD) {
    util.toastError(errQRCodeMessage)
    return
  }

  wx.connectWifi({
    SSID: wifiInfo.SSID,
    BSSID: wifiInfo.BSSID,
    password: wifiInfo.PASSWD,
    success: function(res) {
      if (res.errCode == 0) {
        util.toastSuccess(connectSuccessMessage)
      } else {
        util.toastError(connectFailMessage)
        console.error(JSON.stringify(res))
      }
    },
    fail: function(err) {
      util.toastError(connectFailMessage)
      console.error(JSON.stringify(err))
    }
  })
}

module.exports = {
  startConnecting: _startConnecting
}