Page({
  data: {
    healthMetrics: [
      {
        id: 1,
        title: '今日热量',
        value: '0',
        unit: 'kcal',
        icon: '/assets/icons/calorie.png'
      },
      {
        id: 2,
        title: '蛋白质',
        value: '0',
        unit: 'g',
        icon: '/assets/icons/protein.png'
      },
      {
        id: 3,
        title: '碳水化合物',
        value: '0',
        unit: 'g',
        icon: '/assets/icons/carbs.png'
      },
      {
        id: 4,
        title: '脂肪',
        value: '0',
        unit: 'g',
        icon: '/assets/icons/fat.png'
      },
      {
        id: 5,
        title: '维生素',
        value: '0',
        unit: '%',
        icon: '/assets/icons/vitamin.png'
      },
      {
        id: 6,
        title: '膳食纤维',
        value: '0',
        unit: 'g',
        icon: '/assets/icons/fiber.png'
      }
    ]
  },

  onLoad() {
    this.loadHealthMetrics()
  },

  loadHealthMetrics() {
    // TODO: 从后端API获取健康指标数据
    // wx.request({
    //   url: 'your-api-endpoint',
    //   success: (res) => {
    //     this.setData({
    //       healthMetrics: res.data
    //     })
    //   }
    // })
  },

  goToAnalyze() {
    wx.switchTab({
      url: '/pages/analyze/analyze'
    })
  },

  goToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  }
}) 