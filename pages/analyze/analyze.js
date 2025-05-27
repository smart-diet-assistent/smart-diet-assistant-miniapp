Page({
  data: {
    tempImagePath: '',
    analysisResult: null
  },

  onLoad() {
    this.ctx = wx.createCameraContext()
  },

  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          tempImagePath: res.tempImagePath
        })
      },
      fail: (error) => {
        console.error('拍照失败：', error)
        wx.showToast({
          title: '拍照失败，请重试',
          icon: 'none'
        })
      }
    })
  },

  retakePhoto() {
    this.setData({
      tempImagePath: '',
      analysisResult: null
    })
  },

  analyzePhoto() {
    wx.showLoading({
      title: '正在分析...'
    })

    // 上传图片到服务器并获取分析结果
    wx.uploadFile({
      url: 'your-api-endpoint/analyze', // TODO: 替换为实际的API地址
      filePath: this.data.tempImagePath,
      name: 'food_image',
      success: (res) => {
        const result = JSON.parse(res.data)
        // 示例数据结构
        this.setData({
          analysisResult: [
            { name: '热量', value: result.calories || '0', unit: 'kcal' },
            { name: '蛋白质', value: result.protein || '0', unit: 'g' },
            { name: '碳水化合物', value: result.carbs || '0', unit: 'g' },
            { name: '脂肪', value: result.fat || '0', unit: 'g' }
          ]
        })
      },
      fail: (error) => {
        console.error('分析失败：', error)
        wx.showToast({
          title: '分析失败，请重试',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  error(e) {
    console.error(e.detail)
  }
}) 