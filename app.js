// app.js
App({
  onLaunch() {
    console.log('小程序启动')
    
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        console.log('系统信息：', res)
      }
    })

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  
  onShow() {
    console.log('小程序显示')
  },
  
  onHide() {
    console.log('小程序隐藏')
  },
  
  globalData: {
    userInfo: null
  }
})
