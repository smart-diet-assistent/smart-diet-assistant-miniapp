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
    dietTypes: ['无特殊要求', '素食主义', '生酮饮食', '地中海饮食', '低碳水饮食']
  },

  onLoad() {
    this.loadUserProfile()
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
  }
}) 