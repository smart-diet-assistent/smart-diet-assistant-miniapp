const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  try {
    // 这里应该根据用户的健康状况和饮食记录推荐食物
    // 目前返回示例数据
    return {
      data: [
        {
          id: 1,
          name: '新鲜水果',
          description: '富含维生素和膳食纤维',
          tags: ['低热量', '维生素C']
        },
        {
          id: 2,
          name: '全谷物',
          description: '提供优质碳水化合物',
          tags: ['膳食纤维', '饱腹感']
        },
        {
          id: 3,
          name: '瘦肉',
          description: '优质蛋白质来源',
          tags: ['高蛋白', '低脂肪']
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