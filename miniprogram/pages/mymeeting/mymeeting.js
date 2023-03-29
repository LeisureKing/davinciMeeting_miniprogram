// pages/mymeeting/mymeeting.js
const {getMySubscribeMeeting,getMyMeeting,cancelMeeting} = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meeting:[],
    method:null,
    dialog:false,
    meetingId:null,
    msg:"",
  },

  cancel:function (params) {
    // var app = getApp()
    // if(method == 'mySubmit') {
    //   cancelMeeting({
    //     meetingId:this.data.meeting.id,
    //     uid:app.globalData.token
    //   })
    // }
    console.log(params.currentTarget.dataset.id)
    this.setData({
      dialog:true,
      meetingId:params.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    if(options.method == 'mySubmit') {
      getMyMeeting(app.globalData.token).then((res) => {
        this.setData({
          meeting:res,
          method:'mySubmit',
          msg:'确定需要取消会议吗？'
        })
      })
    } else {
      getMySubscribeMeeting(app.globalData.token).then((res) => {
        this.setData({
          meeting:res,
          method:'mySubscribe',
          msg:'确定需要取消订阅吗？'
        })
      })
    }
  },


  close:function () {
    this.setData({
      dialog:false
    })
  },

  sure:function (e) {
    this.setData({
      dialog:false
    })
    var app = getApp()
    if(this.data.method == 'mySubmit') {
      cancelMeeting({
        meetingId:this.data.meetingId,
        uid:app.globalData.token
      }).then((res) => {
        wx.switchTab({
          url: '../me/me',
        }),
        wx.showToast({
          title: res.msg,
        })
        
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})