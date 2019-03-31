const app = getApp()
const util = require('../../utils/util.js')
const getWifiListError = "获取wifi列表失败"
var page;
Page({
  data: {
    primarySize: 'default',
    loading: false,
    plain: false,
    disabled: false,
    wifiInfos:[]
  },
  onLoad: function() {
    page = this
    getWifiList()
  },
  getWifiList: function() {
    getWifiList()
  }
})

function wifiListCallback(res) {
  console.log("===== wifiListCallback QRCode ======")
  var list = []
  for (let wifi of res.wifiList) {
    console.log(JSON.stringify(wifi))
    list.push(wifi.SSID)
  }
  page.setData({
    wifiInfos: list
  })
}

function getWifiList() {
  wx.onGetWifiList(wifiListCallback)
  app.startWiFi(function () {
    wx.getWifiList({
      success: function (res) {
        if (res.errCode != 0) {
          util.toastError(getWifiListError)
          console.error(getWifiListError + ": " + JSON.stringify(res))
        }
      },
      fail: function (err) {
        util.toastError(getWifiListError)
        console.error(getWifiListError + ": " + JSON.stringify(err))
      }
    })
  })
}