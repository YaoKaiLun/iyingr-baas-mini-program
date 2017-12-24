let contentGroupID = 348
let pageLimit = 1000
let pageOffset = 0

Page({
  data: {
    articles: [],
  },
  onLoad: function () {
    this.getArticles()
  },
  getArticles: function () {
    let params = {
      contentGroupID: contentGroupID,
      limit: pageLimit,
      offset: pageOffset
    }
    wx.BaaS.getContentList(params).then(res => {
      this.setData({
        articles: res.data.objects,
      })
    })
  },
  toDetailPage: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  }
})