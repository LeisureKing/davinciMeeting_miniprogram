Page({
  data: {
    msg:"",
  },
  goHome: function (params) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  onLoad: function (options) {
    this.setData({
      msg:options.msg
    })
  },
});