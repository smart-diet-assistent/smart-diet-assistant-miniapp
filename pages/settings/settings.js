Page({
  data: {
    userName: '',
    assistantName: '小膳',
    avatars: [
      '/images/profile/profile1.jpg',
      '/images/profile/profile2.jpg',
      '/images/profile/profile3.jpg',
      '/images/profile/profile4.jpg',
      '/images/profile/profile5.jpg',
      '/images/profile/profile6.jpg'
    ],
    selectedAvatar: 0,
    selectedAvatarPath: '/images/profile/profile1.jpg'
  },

  onLoad() {
    // 尝试加载已保存的设置
    const userSettings = wx.getStorageSync('userSettings')
    if (userSettings) {
      this.setData({
        userName: userSettings.userName || '',
        assistantName: userSettings.assistantName || '小膳',
        selectedAvatarPath: userSettings.assistantAvatar || '/images/profile/profile1.jpg'
      })
      // 找到当前选中的头像索引
      const avatarIndex = this.data.avatars.findIndex(avatar => avatar === userSettings.assistantAvatar)
      if (avatarIndex !== -1) {
        this.setData({ selectedAvatar: avatarIndex })
      }
    }
  },

  onUserNameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  onAssistantNameInput(e) {
    this.setData({
      assistantName: e.detail.value
    })
  },

  onSelectAvatar(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectedAvatar: index,
      selectedAvatarPath: this.data.avatars[index]
    })
  },

  saveSettings() {
    if (!this.data.userName.trim()) {
      wx.showToast({
        title: '请输入您的名字',
        icon: 'none'
      })
      return
    }

    if (!this.data.assistantName.trim()) {
      wx.showToast({
        title: '请输入管家的名字',
        icon: 'none'
      })
      return
    }

    const userSettings = {
      userName: this.data.userName.trim(),
      assistantName: this.data.assistantName.trim(),
      assistantAvatar: this.data.selectedAvatarPath
    }

    try {
      wx.setStorageSync('userSettings', userSettings)
      wx.showToast({
        title: '设置已保存',
        icon: 'success',
        duration: 2000,
        success: () => {
          // 延迟返回，让用户看到成功提示
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/home/home'
            })
          }, 2000)
        }
      })
    } catch (error) {
      console.error('保存设置失败:', error)
      wx.showToast({
        title: '保存失败，请重试',
        icon: 'none'
      })
    }
  }
}) 