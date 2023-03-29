// pages/meetinginfo/meetinginfo.js

const { getMeeting,addSubscribe} = require('../../http/api')
const {formatTime,formatMinute } = require('../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meeting:[],
    meetingModel: [{
      name: '1',
      value: '总行'
    },
    {
      name: '2',
      value: '省分行'
    },
    {
      name: '3',
      value: '市分行'
    },
    {
      name: '4',
      value: '各县支行'
    }],
  },

  Subscribe: function (params) {
    var that = this
    var app = getApp()
    wx.requestSubscribeMessage({
      tmplIds: ['86iDbQppS1P5jkZNKaYpo7_HkhHhp1lfflNGwF8m0D4','pUoNv51kq2qMiY2zwr6rzIe1zDL_fDKCy69TNvk36vU'],
      success(res) {
        console.log(res)
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          addSubscribe({
            meetingId:that.data.meeting.id,
            uid:app.globalData.token
          }).then((res) => {
            wx.showToast({
              title: '订阅成功',
            })
          })
        }
      }})
  },

  getMeetingMode:function (arr) {
    var len = "";
    var mode = this.data.meetingModel
    for(var i = 0; i < mode.length; i++) {
      if(this.isContain(arr,mode[i].name)) {
        len = len + mode[i].value + "-";
      }
    }
    return len.substring(0,len.length-1)
  },

  isContain: function (arr,item) {
    for(var i = 0; i < arr.length; i++) {
      if (arr[i] == item)
        return true
    }
    return false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.mid)
    getMeeting(options.mid).then((res) => {
      this.setData({
        meeting:res
      })
      this.setData({
        ['meeting.date']:formatTime(new Date(this.data.meeting.date)),
        ['meeting.startTime']:formatMinute(new Date(this.data.meeting.startTime)),
        ['meeting.endTime']:formatMinute(new Date(this.data.meeting.endTime)),
        ['meeting.mode']:this.getMeetingMode(this.data.meeting.mode)
      })
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