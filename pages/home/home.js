Page({
  data: {
    assistantName: '',
    assistantAvatar: '',
    userName: '',
    todayCalories: 0,
    targetCalories: 2000,
    todayFoods: [],
    healthMetrics: [],
    recommendedFoods: [],
    isLoading: true,
    showDialog: false,
    selectedDays: 7,
    dialogType: '', // 'summary' or 'plan'
    chatMessages: []
  },

  onLoad() {
    console.log('页面加载完成')
    this.loadUserSettings()
    this.loadAllData()
  },

  onPullDownRefresh() {
    this.loadAllData()
  },

  async loadUserSettings() {
    try {
      const userSettings = wx.getStorageSync('userSettings')
      if (userSettings) {
        this.setData({
          assistantName: userSettings.assistantName || '小膳',
          assistantAvatar: userSettings.assistantAvatar || '/images/profile/profile1.jpg',
          userName: userSettings.userName || '用户'
        })
      } else {
        // 如果没有设置，跳转到设置页面
        wx.redirectTo({
          url: '/pages/settings/settings'
        })
      }
    } catch (error) {
      console.error('加载用户设置失败:', error)
    }
  },

  loadAllData() {
    this.setData({ isLoading: true })
    Promise.all([
      this.loadTodayFoods(),
      this.loadHealthMetrics(),
      this.loadRecommendedFoods()
    ]).finally(() => {
      this.setData({ isLoading: false })
      wx.stopPullDownRefresh()
    })
  },

  async loadHealthMetrics() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'getHealthMetrics'
      })
      if (res.result && res.result.data) {
        this.setData({
          healthMetrics: res.result.data
        })
      }
    } catch (error) {
      console.error('获取健康指标失败:', error)
      wx.showToast({
        title: '获取数据失败',
        icon: 'none'
      })
    }
  },

  async loadTodayFoods() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'getTodayFoods'
      })
      if (res.result && res.result.data) {
        const foods = res.result.data
        const totalCalories = foods.reduce((sum, food) => sum + (food.calories || 0), 0)
        this.setData({
          todayFoods: foods,
          todayCalories: totalCalories
        })
      }
    } catch (error) {
      console.error('获取今日食物失败:', error)
      wx.showToast({
        title: '获取数据失败',
        icon: 'none'
      })
    }
  },

  async loadRecommendedFoods() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'getRecommendedFoods'
      })
      if (res.result && res.result.data) {
        this.setData({
          recommendedFoods: res.result.data
        })
      }
    } catch (error) {
      console.error('获取推荐食物失败:', error)
      wx.showToast({
        title: '获取数据失败',
        icon: 'none'
      })
    }
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
  },

  showSummaryDialog() {
    this.setData({
      showDialog: true,
      dialogType: 'summary',
      selectedDays: 7
    })
  },

  showPlanDialog() {
    this.setData({
      showDialog: true,
      dialogType: 'plan',
      selectedDays: 7
    })
  },

  onSliderChange(e) {
    this.setData({
      selectedDays: e.detail.value
    })
  },

  onDialogConfirm() {
    const { dialogType, selectedDays, chatMessages } = this.data
    let newMessage = ''
    if (dialogType === 'summary') {
      newMessage = `【小管家】为您生成${selectedDays}天的营养总结：\n（此处为模拟内容，后续可接入云函数）`
    } else if (dialogType === 'plan') {
      newMessage = `【小管家】为您制定${selectedDays}天的饮食计划：\n（此处为模拟内容，后续可接入云函数）`
    }
    this.setData({
      showDialog: false,
      chatMessages: [...chatMessages, newMessage]
    })
  },

  onDialogCancel() {
    this.setData({
      showDialog: false
    })
  }
}) 