//index.js
//获取应用实例
const connector = require('./connector.js')
const util = require('../../utils/util.js')
const app = getApp()
const scanTypeErrMessage = "请扫描二维码"
Page({
  data: {
    primarySize: 'default',
    loading: false,
    plain: false,
    disabled: false
  },
  //扫码连接wifi
  scanWiFi: function () {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: function (res) {
        if (res.scanType == "QR_CODE") {
          connector.startConnecting(res.result)
        } else {
          toastError(scanTypeErrMessage)
        }
      }
    })
  }
})