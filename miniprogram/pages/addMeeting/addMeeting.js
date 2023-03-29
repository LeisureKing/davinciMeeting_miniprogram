// pages/addMeeting.js
const {
  getDepartments,
  addMeeting
} = require('../../http/api.js')
const {
  formatTime
} = require('../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    items: [{
        value: '1',
        name: '本地会议',
        checked: 'true'
      },
      {
        value: '2',
        name: '电视电话会议'
      },
    ],
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
      }
    ],
    array: [],
    userinfo: "",
    room: [],
    roomIndex: 0,
    date: null,
    phone: null,
    departmentIndex: null,
    username: null,
    startTime: "",
    endTime: "",
    isHidden: true,
    model: "",
    type: 1,
  },

  bindPickerChange: function (e) {
    this.setData({
      departmentIndex: e.detail.value
    })
  },

  bindRoomPickerChange: function (e) {
    this.setData({
      roomIndex: e.detail.value
    })
  },

  bindDatePickerChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    // const items = this.data.items
    // for (let i = 0, len = items.length; i < len; ++i) {
    //   items[i].checked = items[i].value === e.detail.value
    // }
    if (e.detail.value == 1) {
      this.setData({
        type: e.detail.value,
        isHidden: true,
        model: "",
      })
    } else {
      this.setData({
        type: e.detail.value,
        isHidden: false
      })
    }
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      model: e.detail.value
    })
  },

  openSuccess: function () {
    wx.navigateTo({
      url: 'msg_success?msg=会议等待办公室审核通过后可在主页上公示'
    })
  },

  submitMeeting: function (e) {
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: ['qd0DzXbb25dDz43MDGJlyRQLQnZBFJC9ZR-SZxLiC64','86iDbQppS1P5jkZNKaYpo7_HkhHhp1lfflNGwF8m0D4','pUoNv51kq2qMiY2zwr6rzIe1zDL_fDKCy69TNvk36vU'],
      success(res) {
        console.log(res)
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          console.log("ok")
        }
      },
      complete(res) {
        addMeeting({
          name: e.detail.value.meetName,
          lunch: e.detail.value.lunch,
          department: that.data.array[that.data.departmentIndex].id,
          phone: e.detail.value.phone,
          roomId: that.data.room[that.data.roomIndex].id,
          date: that.data.date,
          startTime: that.data.startTime,
          endTime: that.data.endTime,
          content: e.detail.value.content,
          joinPerson: e.detail.value.joinPerson,
          type: that.data.type,
          mode: that.data.model,
          ledText: e.detail.value.LEDText,
          uid: wx.getStorageSync('token')
        }).then(() => {
          that.openSuccess()
        })
      }
    })



  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()

    this.setData({
      array: app.globalData.department,
      room: app.globalData.room,
      date: formatTime(new Date()),
      username: app.globalData.username,
      phone: app.globalData.phone,
      departmentIndex: wx.getStorageSync("departmentIndex"),
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