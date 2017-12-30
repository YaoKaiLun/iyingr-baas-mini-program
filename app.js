App({
  onLaunch() {
    require('./vendor/sdk-v1.1.3.js')
    let clientID = '4eb40e00207ccaa8b9b8'
    wx.BaaS.init(clientID)
  }
})