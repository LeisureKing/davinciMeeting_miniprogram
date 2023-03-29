// pages/userInfo/info.js
const {
  updateInfo
} = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    username:null,
    phone:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  handleGetPhoneNumber(e) {
    console.log(e.detail)
  },

  // 请求订阅
  requestSubscribeMessage:function (e) {
    const self = this
    wx.requestSubscribeMessage({
      tmplIds: ['NjUZKs1P3MtgBe7JcEiTFFFD8EAgbfZAaxdcT3cZx1M','86iDbQppS1P5jkZNKaYpo7_HkhHhp1lfflNGwF8m0D4','qd0DzXbb25dDz43MDGJlyRQLQnZBFJC9ZR-SZxLiC64'],
      success(res) {
        console.log(res)
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          self.subscribeMessageSend()
        }
      },
      complete(res) {
        console.log(res)
      }
    })
  },

  requestMsg(){
    wx.requestSubscribeMessage({
      tmplIds: ['7q8b26nujm2nAFu0WAdX0rHXfephmyqYmXElajUeqXs'],
      success (res) { }
    })
  },

  submitInfo: function (e) {
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: ['7q8b26nujm2nAFu0WAdX0rHXfephmyqYmXElajUeqXs'],
      success(res) {
        console.log(res)
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          console.log("ok")
        }
      },
      complete(res) {
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              updateInfo({
                code:res.code,
                username: e.detail.value.username,
                phone: e.detail.value.phone,
                department: that.data.array[that.data.index].id,
                passCode: e.detail.value.passCode
              }).then((data) => {
                
                wx.switchTab({
                  url: "../index/index",
                })
                
                wx.setStorageSync('phone', e.detail.value.phone)
                wx.setStorageSync('index', that.data.index)
                wx.setStorageSync('username', e.detail.value.username)
    
                wx.showToast({
                  title: '信息更新成功',
                })
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          },
      })
      }
    })
    
    
},

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var app = getApp()
    this.setData({
      array: app.globalData.department,
      username: wx.getStorageSync('username'),
      index: wx.getStorageSync("departmentIndex"),
      phone:wx.getStorageSync('phone'),
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideHomeButton()
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