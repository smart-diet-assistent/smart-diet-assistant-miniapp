Page({
  data: {
    todayFoods: [
      {
        id: 1,
        name: '早餐',
        amount: '0',
        unit: '份'
      },
      {
        id: 2,
        name: '午餐',
        amount: '0',
        unit: '份'
      },
      {
        id: 3,
        name: '晚餐',
        amount: '0',
        unit: '份'
      }
    ],
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
    ],
    recommendedFoods: [
      {
        id: 1,
        name: '新鲜水果',
        description: '富含维生素和膳食纤维'
      },
      {
        id: 2,
        name: '全谷物',
        description: '提供优质碳水化合物'
      },
      {
        id: 3,
        name: '瘦肉',
        description: '优质蛋白质来源'
      }
    ]
  },

  onLoad() {
    console.log('页面加载完成')
    this.loadHealthMetrics()
    this.loadTodayFoods()
    this.loadRecommendedFoods()
  },

  loadHealthMetrics() {
    console.log('加载健康指标数据')
    // 先使用静态数据
    this.setData({
      healthMetrics: this.data.healthMetrics
    })
  },

  loadTodayFoods() {
    console.log('加载今日食物数据')
    // 先使用静态数据
    this.setData({
      todayFoods: this.data.todayFoods
    })
  },

  loadRecommendedFoods() {
    console.log('加载推荐食物数据')
    // 先使用静态数据
    this.setData({
      recommendedFoods: this.data.recommendedFoods
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