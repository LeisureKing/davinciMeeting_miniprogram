//app.js
const {
  getDepartments,dologin,getRooms
} = require('http/api.js')
App({
  globalData: {
    userInfo: null,
    sysInfo: null,
    department: [],
    role:null,
    phone:null,
    token:null,
    username:null,
    room: [],
  },
  onLaunch: function () {
    //获取会议室
    // getRooms().then(
    //   (res) => (
    //     this.globalData.room = res
    //   ))

    //获取部门
    getDepartments().then(
      (res) => (
        this.globalData.department = res
      ))

    // 获取用户信息
    this.getUserInfo();

    
  },
  //获取用户信息
  getUserInfo: function (cb) {
    var that = this

    try {
      var value = wx.getStorageSync('token')
      if (value) {
        this.getInfo()
      } else {
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              dologin({code:res.code}).then((data)=>{
                that.globalData.phoneNumber=data.phone
                that.globalData.username=data.name
                that.globalData.role = data.role
                that.globalData.token = data.id
                if(that.globalData.phoneNumber === "" | that.globalData.username=== "" | that.globalData.phoneNumber== null | that.globalData.username== null) {
                  wx.reLaunch({
                    url:"/pages/userInfo/info",
                  })
                } else {
                  wx.setStorageSync('role', data.role)
                  wx.setStorageSync('phone', data.phone)
                  wx.setStorageSync('username', data.name)
                  wx.setStorageSync('token', data.id)
                  wx.setStorageSync('departmentIndex', that.getArrayIndex(that.globalData.department,data.department))
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    } catch (e) {
      
    }
  },
  //获取存储的信息
  getInfo: function () {
    var that = this;
    that.globalData.role = wx.getStorageSync('role')
    that.globalData.username= wx.getStorageSync('username')
    that.globalData.phone = wx.getStorageSync('phone')
    that.globalData.token = wx.getStorageSync('token')
    
  },

  getArrayIndex: function (arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i].department == obj) {
            return i;
        }
    }
    return -1;
  },

})