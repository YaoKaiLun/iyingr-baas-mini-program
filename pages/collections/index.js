const MyContentGroup = new wx.BaaS.ContentGroup(348)
const Collection = new wx.BaaS.TableObject(3965)
const pageLimit = 1000

Page({
  data: {
    articles: [],
    currentUserInfo: {}
  },

  onLoad: function() {
    this.getCurrentUserInfo()
    this.getArticles()
  },

  getCurrentUserInfo: function() {
    let currentUserInfo = wx.BaaS.storage.get('userinfo')
    if (!currentUserInfo) {
      wx.BaaS.login().then(res => {
        this.setData({
          currentUserInfo: wx.BaaS.storage.get('userinfo')
        })
      }, err => {
        wx.navigateTo({
          url: `../index/index`
        })
      })
    } else {
      this.setData({currentUserInfo})
    }
  },

  getArticles: function() {
    let collectionQuery = new wx.BaaS.Query()
    collectionQuery.compare('user_id', '=', wx.BaaS.storage.get('uid'))
    Collection.setQuery(collectionQuery).limit(pageLimit).find().then(res => {
      let contentIDs = []
      res.data.objects.forEach(content => {
        contentIDs.push(content.content_id)
      })

      let userInfo = this.data.currentUserInfo
      userInfo.collectionAmount = contentIDs.length

      let contentQuery = new wx.BaaS.Query()
      contentQuery.in('id', contentIDs)
      MyContentGroup.setQuery(contentQuery).limit(pageLimit).find().then(res => {
        this.setData({
          articles: res.data.objects,
          currentUserInfo: userInfo,
        })
      })
    })
  },

  toDetailPage: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  }
})