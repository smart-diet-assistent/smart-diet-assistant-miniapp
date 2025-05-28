const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      gender: 0,
      age: ''
    },
    healthInfo: {
      height: '',
      weight: '',
      activityLevel: 0,
      dietType: 0,
      allergies: ''
    },
    genderArray: ['未设置', '男', '女'],
    activityLevels: ['几乎不运动', '轻度运动', '中度运动', '重度运动'],
    dietTypes: ['无特殊要求', '素食主义', '生酮饮食', '地中海饮食', '低碳水饮食'],
    healthMetrics: [],
    todayFoods: [],
    recommendedFoods: [],
    showProfileInfo: false,
    todayCalories: 0,
    targetCalories: 2000
  },

  onLoad() {
    this.loadUserProfile()
    this.loadAllData()
  },

  loadUserProfile() {
    // TODO: 从后端获取用户信息
    const userProfile = wx.getStorageSync('userProfile')
    if (userProfile) {
      this.setData({
        userInfo: { ...this.data.userInfo, ...userProfile.userInfo },
        healthInfo: { ...this.data.healthInfo, ...userProfile.healthInfo }
      })
    }
  },

  loadAllData() {
    Promise.all([
      this.loadHealthMetrics(),
      this.loadTodayFoods(),
      this.loadRecommendedFoods()
    ])
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
      wx.showToast({ title: '获取健康指标失败', icon: 'none' })
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
      wx.showToast({ title: '获取今日食物失败', icon: 'none' })
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
      wx.showToast({ title: '获取推荐食物失败', icon: 'none' })
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      'userInfo.avatarUrl': avatarUrl
    })
  },

  onNicknameChange(e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    })
  },

  onGenderChange(e) {
    this.setData({
      'userInfo.gender': parseInt(e.detail.value)
    })
  },

  onAgeChange(e) {
    this.setData({
      'userInfo.age': e.detail.value
    })
  },

  onHeightChange(e) {
    this.setData({
      'healthInfo.height': e.detail.value
    })
  },

  onWeightChange(e) {
    this.setData({
      'healthInfo.weight': e.detail.value
    })
  },

  onActivityLevelChange(e) {
    this.setData({
      'healthInfo.activityLevel': parseInt(e.detail.value)
    })
  },

  onDietTypeChange(e) {
    this.setData({
      'healthInfo.dietType': parseInt(e.detail.value)
    })
  },

  onAllergiesChange(e) {
    this.setData({
      'healthInfo.allergies': e.detail.value
    })
  },

  saveProfile() {
    const profile = {
      userInfo: this.data.userInfo,
      healthInfo: this.data.healthInfo
    }

    // 保存到本地存储
    wx.setStorageSync('userProfile', profile)

    // TODO: 保存到后端
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
  },

  goToSettings() {
    wx.navigateTo({ url: '/pages/settings/settings' })
  },

  toggleProfileInfo() {
    this.setData({ showProfileInfo: !this.data.showProfileInfo })
  }
}) 