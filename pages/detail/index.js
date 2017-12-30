const contentGroupID = 348
let Collection = new wx.BaaS.TableObject(3965)
let id = ''

Page({
  data: {
    article: {},
    collectText: '收藏'
  },

  onLoad: function(option) {
    id = option.id
    this.getArticle(id)
    this.queryCollectionRecord().then((res) => {
      let records = res.data.objects
      if (records.length < 1) {
        this.setData({collectText: '收藏'})
      } else {
        this.setData({collectText: '取消收藏'})
      }
    })
  },

  getArticle: function(id) {
    let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
    MyContentGroup.getContent(id).then(res => {
      let myDate = new Date(res.data.created_at * 1000)
      let formattedDate = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDay()}`
      res.data.created_at = formattedDate
      this.setData({
        article: res.data
      })
    })
  },

  onShareAppMessage: function(res) {
    let article = this.data.article
    return {
      title: article.title,
      imageUrl: article.poster,
      path: `pages/detail/index?id=${id}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  
  queryCollectionRecord: function () {
    let userID = wx.BaaS.storage.get('uid')
    let query = new wx.BaaS.Query()
    query.compare('user_id', '=', userID)
    query.compare('content_id', '=', id)
    return Collection.setQuery(query).find()
  },

  toggleCollectionStatus: function () {
    this.queryCollectionRecord().then((res) => {
      let records = res.data.objects
      if (records.length < 1) {
        let collection = Collection.create()
        collection.set('user_id', wx.BaaS.storage.get('uid'))
        collection.set('content_id', id)
        collection.save().then(() => {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({collectText: '取消收藏'})
        })
      } else {
        Collection.delete(records[0].id).then(() => {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({collectText: '收藏'})
        })
      }
    })
  }
})