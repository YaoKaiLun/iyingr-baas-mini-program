const wxParser = require('../../wxParser/index')
let MyContentGroup = new wx.BaaS.ContentGroup(348)
let Collection = new wx.BaaS.TableObject(3965)
let id = ''
const COLLECTED_TEXT = "取消收藏"
const UNCOLLECTED_TEXT = "收藏"

Page({
  data: {
    article: {},
    collectText: COLLECTED_TEXT
  },

  onLoad: function(option) {
    id = option.id
    this.getArticle(id)
    this.queryCollectionRecord().then((res) => {
      let records = res.data.objects
      if (records.length < 1) {
        this.setData({ collectText: COLLECTED_TEXT})
      } else {
        this.setData({ collectText: UNCOLLECTED_TEXT})
      }
    })
  },

  getArticle: function(id) {
    MyContentGroup.getContent(id).then(res => {
      let myDate = new Date(res.data.created_at * 1000)
      let formattedDate = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDay()}`
      res.data.created_at = formattedDate
      this.setData({
        article: res.data
      })
      wxParser.parse({
        bind: 'richText',
        html: res.data.content,
        target: this,
        enablePreviewImage: true,
      })
    })
  },

  onShareAppMessage: function(res) {
    let article = this.data.article
    return {
      title: article.title,
      imageUrl: article.poster,
      path: `pages/detail/index?id=${id}`,
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
          this.setData({collectText: UNCOLLECTED_TEXT})
        })
      } else {
        Collection.delete(records[0].id).then(() => {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({collectText: COLLECTED_TEXT})
        })
      }
    })
  }
})