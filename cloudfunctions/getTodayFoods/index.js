const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  try {
    // 这里应该从数据库获取用户今日的食物记录
    // 目前返回示例数据
    return {
      data: [
        {
          id: 1,
          name: '早餐',
          time: '08:00',
          amount: '1',
          unit: '份',
          calories: 350
        },
        {
          id: 2,
          name: '午餐',
          time: '12:30',
          amount: '1',
          unit: '份',
          calories: 600
        },
        {
          id: 3,
          name: '晚餐',
          time: '18:30',
          amount: '1',
          unit: '份',
          calories: 500
        }
      ]
    }
  } catch (error) {
    console.error(error)
    return {
      error: error
    }
  }
} 