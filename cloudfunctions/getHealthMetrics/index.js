const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  try {
    // 这里应该从数据库获取用户的健康指标数据
    // 目前返回示例数据
    return {
      data: [
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
    }
  } catch (error) {
    console.error(error)
    return {
      error: error
    }
  }
} 