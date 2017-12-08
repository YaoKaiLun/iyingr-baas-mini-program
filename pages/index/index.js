const comingSoonMovies = [{
    poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505701555.webp',
    id: '26950070'
  }, {
    poster: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1491314385.1.webp',
    id: '27103195'
  }, {
    poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505712371.webp',
    id: '27205042'
}]

const firstPageMovies = [{
  id: '1292052',
  title: '肖申克的救赎',
  genres: '犯罪, 剧情',
  collect: 0
}, {
  id: '1291546',
  title: '霸王别姬',
  genres: '剧情, 爱情, 同性',
  collect: 0
}, {
  id: '1295644',
  title: '这个杀手不太冷',
  genres: '动作, 剧情, 犯罪',
  collect: 0
}, {
  id: '1292720',
  title: '阿甘正传',
  genres: '爱情, 剧情',
  collect: 0
}, {
  id: '1292063',
  title: '美丽人生',
  genres: '剧情, 喜剧, 爱情',
  collect: 0
}, {
  id: '1291561',
  title: '千与千寻',
  genres: '剧情, 动画, 奇幻',
  collect: 0
}, {
  id: '1295124',
  title: '辛德勒的名单',
  genres: '剧情, 历史, 战争',
  collect: 0
}, {
  id: '1292722',
  title: '泰坦尼克号',
  genres: '剧情, 爱情, 灾难',
  collect: 0
}, {
  id: '3541415',
  title: '盗梦空间',
  genres: '剧情, 动作, 科幻',
  collect: 50
}, {
  id: '2131459',
  title: '机器人总动员',
  genres: '喜剧, 爱情, 科幻',
  collect: 50
}]

const lastPageMovies = [{
  id: '1292001',
  title: '海上钢琴师',
  genres: '剧情, 音乐',
  collect: 0
},{
  id: '3793023',
  title: '三傻大闹宝莱坞',
  genres: '剧情, 喜剧, 爱情',
  collect: 0
}, {
  id: '3011091',
  title: '忠犬八公的故事',
  genres: '剧情',
  collect: 0
}, {
  id: '1291549',
  title: '放牛班的春天',
  genres: '剧情, 音乐',
  collect: 50
}, {
  id: '1292213',
  title: '大话西游之大圣娶亲',
  genres: '喜剧, 爱情, 奇幻',
  collect: 0
}]

let isEnd = false

Page({
  data: {
    comingSoonMovies: [],
    movieList: [],
    loading: false,
    loadMoreText: '加载更多'
  },
  onLoad: function() {
    this.getComingSoonMovies(),
    this.getFirstPageMovies()
  },
  getComingSoonMovies: function() {
    this.setData({
      comingSoonMovies
    })
  },
  getFirstPageMovies: function() {
    this.setData({
      movieList: this.addReadStatus(firstPageMovies)
    })
  },
  loadMore: function() {
    if (!isEnd) {
      this.setData({loading: true})
      setTimeout(() => {
        this.setData({
          movieList: this.addReadStatus(firstPageMovies.concat(lastPageMovies)),
          loading: false
        })
      }, 1000)
      isEnd = true
    } else {
      this.setData({loadMoreText: '已无更多'})
    }
  },
  toDetailPage: function(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let readedPosts = wx.getStorageSync('readedPosts')

    if (!readedPosts) {
      wx.setStorageSync('readedPosts', [id])
    } else if(readedPosts.indexOf(id) == -1) {
      readedPosts.push(id)
      wx.setStorageSync('readedPosts', readedPosts)
    }
    this.setData({movieList: this.addReadStatus(this.data.movieList)})
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  },
  addReadStatus: function(movies) {
    let readedPosts = wx.getStorageSync('readedPosts')
    if (!readedPosts) {
      return movies
    }
    let newMovies = []
    for (let i = 0; i < movies.length; i++) {
      let movie = Object.assign(movies[i])
      if (readedPosts.indexOf(movie.id) != -1) {
        movie.isReaded = true
      } else {
        movie.isReaded = false
      }
      newMovies.push(movie)
    }
    return newMovies
  }
})