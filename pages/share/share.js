const app = getApp()
const util = require('../../utils/util.js')
const getWifiListError = "获取wifi列表失败"
var manualRefresh = false
var page;
Page({
  data: {
    primarySize: 'default',
    loading: false,
    plain: false,
    disabled: false,
    wifiInfos: [],
    connectedWifiInfo: {}
  },
  onLoad: function() {
    page = this
    getWifiList()
  },
  onPullDownRefresh: function() {
    manualRefresh = true
    this.getWifiList()
  },
  getWifiList: function() {
    getWifiList()
  },
  navToQrcodeMaker: function(event) {
    wx.navigateTo({
      url: '/pages/qrcode/qrcode?wifi={{event.currentTarget.dataset.wifiinfo}}',
    })
  }
})

function wifiListCallback(res) {
  console.log("===== wifiListCallback QRCode ======")
  stopRefresh()
  var list = []
  for (let wifi of res.wifiList) {
    console.log(JSON.stringify(wifi))
    list.push(wifi)
  }
  page.setData({
    wifiInfos: list
  })
}

function getWifiList() {
  updateConnected()
  wx.onGetWifiList(wifiListCallback)
  app.startWiFi(function() {
    wx.getWifiList({
      success: function(res) {
        if (res.errCode != 0) {
          stopRefresh()
          util.toastError(getWifiListError)
          console.error(getWifiListError + ": " + JSON.stringify(res))
        }
      },
      fail: function(err) {
        stopRefresh()
        util.toastError(getWifiListError)
        console.error(getWifiListError + ": " + JSON.stringify(err))
      }
    })
  })
}

function updateConnected() {
  app.startWiFi(function() {
    wx.getConnectedWifi({
      success: function(res) {
        if (res.errCode == 0) {
          page.setData({
            connectedWifiInfo: res.wifi
          })
        }
      },
      fail: function(err) {
        console.error("获取连接的wifi失败: " + JSON.stringify(err))
      }
    })
  })
}

function stopRefresh() {
  if (manualRefresh) {
    wx.stopPullDownRefresh()
    manualRefresh = false
  }
}