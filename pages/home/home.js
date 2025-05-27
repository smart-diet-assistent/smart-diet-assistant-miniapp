Page({
  data: {
    healthMetrics: [
      {
        id: 1,
        title: '今日热量',
        value: '0',
        unit: 'kcal'
      },
      {
        id: 2,
        title: '蛋白质',
        value: '0',
        unit: 'g'
      },
      {
        id: 3,
        title: '碳水化合物',
        value: '0',
        unit: 'g'
      },
      {
        id: 4,
        title: '脂肪',
        value: '0',
        unit: 'g'
      },
      {
        id: 5,
        title: '维生素',
        value: '0',
        unit: '%'
      },
      {
        id: 6,
        title: '膳食纤维',
        value: '0',
        unit: 'g'
      }
    ]
  },

  onLoad() {
    console.log('页面加载完成')
    this.loadHealthMetrics()
  },

  loadHealthMetrics() {
    console.log('加载健康指标数据')
    // 先使用静态数据
    this.setData({
      healthMetrics: this.data.healthMetrics
    })
  },

  goToAnalyze() {
    console.log('跳转到分析页面')
    wx.switchTab({
      url: '/pages/analyze/analyze'
    })
  },

  goToProfile() {
    console.log('跳转到个人中心')
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  }
}) 