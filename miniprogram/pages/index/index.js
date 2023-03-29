const { formatTime,getWeek,formatMinute } = require('../utils/utils.js')
const { getMeetings,getRooms } = require('../../http/api')
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    date: '2021-09-01',
    time: '12:01',
    week:null,
    room:[],
    meeting:[],
  },
  onAddMeeting: function() {
    wx.navigateTo({
      url:"../addMeeting/addMeeting",
    })
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
    })
    this.changeWeek()
    this.getMeeting(this.data.date)
  },
  //当前日期加减天数,falg:true表示只要年月日
   addChangeDate:function(){
    var nowdate = Date.parse(this.data.date) 
    nowdate = nowdate + 24 * 60 * 60 * 1000

    let time = require('../utils/utils')
    
    var changedate = formatTime(new Date(nowdate))
    this.setData({
      date:changedate,
      week:getWeek(new Date(nowdate))
    })
    this.getMeeting(this.data.date)
  },

  reduceChangeDate:function(){
    var nowdate = Date.parse(this.data.date) 
    nowdate = nowdate - 24 * 60 * 60 * 1000

    let time = require('../utils/utils')
    
    var changedate = formatTime(new Date(nowdate))
    this.setData({
      date:changedate,
      week:getWeek(new Date(nowdate))
    })
    this.getMeeting(this.data.date)
  },

  changeWeek:function () {
    var nowdate = Date.parse(this.data.date) 
    this.setData({
      week:getWeek(new Date(nowdate))
    })
  },

  getMeeting: function (date) {
    getMeetings({
      date:date
    }).then((res) => {
      this.setData({
        meeting:res
      })
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    getRooms().then((res) => {
      this.setData({
        date:formatTime(new Date()),
        room:res,
      })

      app.globalData.room = res

      this.changeWeek()
      this.getMeeting(this.data.date)
    })
    
   
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
    this.getMeeting(this.data.date)
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

  },

  handleGetPhoneNumber(e) {
    console.log(e.detail)
  },
})