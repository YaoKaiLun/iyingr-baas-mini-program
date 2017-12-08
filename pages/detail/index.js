const movieInfo = {
  title: '蓝莓之夜',
  year: "2007",
  countries: '中国大陆, 香港, 法国',
  genres: '剧情, 爱情',
  directors: '王家卫',
  poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2237042966.webp',
  casts: [{
    id: '1000272',
    avatar: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p23836.webp',
    name: '诺拉·琼斯'
  }, {
    id: '1010510',
    avatar: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4952.webp',
    name: '裘德·洛'
  }, {
    id: '1054454',
    avatar: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.webp',
    name: '娜塔莉·波特曼'
  }, {
    id: '1018989',
    avatar: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8829.webp',
    name: '蕾切尔·薇兹'
  }],
  summary: '伊丽莎白（诺拉•琼斯饰）被男友抛弃，伤心又苦恼的她把钥匙扔在咖啡店里。咖啡店的老板杰瑞米（裘德•洛饰）保存了很多钥匙，每把钥匙都埋藏了一个伤心的故事。伊丽莎白爱吃店里没人点的蓝莓蛋糕，在某一晚决定离开纽约，穿越美国到处看看。在旅途上认识了明明深爱却困囿彼此的分居夫妇，还有豪爽爱赌却鲜回家看望父亲的少女（娜塔莉•波曼饰），每到一个地方她就给杰瑞米写一张明信片。以他人为镜，伊丽莎白找到了爱的真谛，回到纽约，看见等待自己的杰瑞米，可以幸福地，再吃一客蓝莓蛋糕，放心享受爱的欢愉'
}

let id = ''
Page({
  data: {
    detail: {},
    isCollected: false,
  },
  onLoad: function(option) {
    id = option.id
    this.setData({detail: movieInfo})
    let collections = wx.getStorageSync('collections')
    if (collections && collections.indexOf(id) !== -1) {
      this.setData({isCollected: true})
    }
  },
  onShareAppMessage: function (res) {
    let detail = this.data.detail
    return {
      title: detail.title,
      imageUrl: detail.poster,
      path: `pages/detail/index?id=${id}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  toggleCollect: function() {
    let collections = wx.getStorageSync('collections')
    if (collections && collections.indexOf(id) !== -1) {
      collections.splice(collections.indexOf(id), 1)
      wx.setStorageSync('collections', collections)
      this.setData({isCollected: false})
    } else {
      if (!collections) {
        collections = []
      }
      collections.push(id)
      wx.setStorageSync('collections', collections)
      this.setData({isCollected: true})
    }
  }
})