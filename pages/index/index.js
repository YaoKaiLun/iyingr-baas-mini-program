let contentGroupID = 348
let isEnd = false
let pageLimit = 4
let pageOffset = 0
const READED_ARTICLES = 'READED_ARTICLES'

Page({
  data: {
    articles: [],
    loading: false,
    loadMoreText: '加载更多'
  },

  onLoad: function() {
    this.getArticles()
  },

  getArticles: function() {
    if (!isEnd && !this.data.loading) {
      this.setData({loading: true})
      let params = {
        contentGroupID: contentGroupID,
        limit: pageLimit,
        offset: pageOffset
      }
      wx.BaaS.getContentList(params).then(res => {
        let data = res.data.objects
        let oldArticles = Object.assign(this.data.articles)

        this.setData({
          articles: oldArticles.concat(this.addReadStatus(data)),
          loading: false
        })

        pageOffset += pageLimit

        if (data.length < pageLimit) {
          this.setData({
            loadMoreText: '已无更多',
          })
          isEnd = true
        }
      }, err => {
        console.log('err: ', err)
        this.setData({loading: false})
      })
    }
  },

  toDetailPage: function(e) {
    let id = e.currentTarget.dataset.id
    let readedArticles = wx.getStorageSync(READED_ARTICLES)

    if (!readedArticles) {
      wx.setStorageSync(READED_ARTICLES, [id])
    } else if(readedArticles.indexOf(id) == -1) {
      readedArticles.push(id)
      wx.setStorageSync(READED_ARTICLES, readedArticles)
    }
    this.setData({articles: this.addReadStatus(this.data.articles)})
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  },

  addReadStatus: function(articles) {
    let readedArticles = wx.getStorageSync(READED_ARTICLES)
    if (!readedArticles) {
      return articles
    }

    let newArticles = []
    for (let i = 0; i < articles.length; i++) {
      let article = Object.assign(articles[i])
      if (readedArticles.indexOf(article.id) != -1) {
        article.isReaded = true
      } else {
        article.isReaded = false
      }
      newArticles.push(movie)
    }

    return newArticles
  }
})