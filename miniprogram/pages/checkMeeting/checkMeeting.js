// pages/checkMeeting/checkMeeting.js
// pages/addMeeting.js
const {
  getDepartments,
  addMeeting,
  getMeeting,
  checkMeeting
} = require('../../http/api.js')
const {
  formatTime,
  formatMinute
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
        value: '各市分行'
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
    mode: "",
    type: 1,
    meeting: null,
    name: null,
    ledText:"",
    id:"",
    isHiddenButton:true,
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
      url: '../addMeeting/msg_success?msg=更新成功，可前往首页查看'
    })
  },

  getDepartmentIndex: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i].department == obj) {
        return i;
      }
    }
    return -1;
  },

  getRoomIndex: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i].roomName == obj) {
        return i;
      }
    }
    return -1;
  },

  checkMeeting: function (e) {
    //console.log(this.data.room[this.data.roomIndex].id)
    console.log(e.detail.target.id)
    checkMeeting({
      id:this.data.id,
      name: e.detail.value.meetName,
      lunch: e.detail.value.lunch,
      department: this.data.array[this.data.departmentIndex].id,
      phone: e.detail.value.phone,
      roomId: this.data.room[this.data.roomIndex].id,
      date: this.data.date,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      content: e.detail.value.content,
      joinPerson: e.detail.value.joinPerson,
      type: this.data.type,
      mode: this.data.mode,
      ledText: e.detail.value.LEDText,
      uid: wx.getStorageSync('token'),
      isCheck:e.detail.target.id
    }).then(() => {
      this.openSuccess()
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(options.status == 'checked') {
      this.setData({
        isHiddenButton:true
      })
    } else {
      this.setData({
        isHiddenButton:false
      })
    }

    var id = options.mid
    var app = getApp()
    getMeeting(id).then((res) => {
      this.setData({
        id:res.id,
        room: app.globalData.room,
        array: app.globalData.department,
        name: res.name,
        username: res.lunch,
        departmentIndex: this.getDepartmentIndex(app.globalData.department, res.department),
        phone: res.phone,
        roomIndex: this.getRoomIndex(app.globalData.room, res.roomId),
        date: formatTime(new Date(res.date)),
        startTime: formatMinute(new Date(res.startTime)),
        endTime: formatMinute(new Date(res.endTime)),
        content: res.content,
        joinPerson: res.joinPerson,
        type: res.type,
        mode: res.mode,
        ledText: res.ledText,
      })
      this.updateType()
    })
  },

  updateType: function () {
    const items = this.data.items
    const values = this.data.type

    const meetingModel = this.data.meetingModel
    const values1 = this.data.mode

    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }



    if (this.data.type == 2) {
      
      for (let i = 0, lenI = meetingModel.length; i < lenI; ++i) {
        meetingModel[i].checked = false

        for (let j = 0, lenJ = values1.length; j < lenJ; ++j) {
          if (meetingModel[i].name === values1[j]) {
            meetingModel[i].checked = true
            break
          }
        }
      }
      this.setData({
        isHidden: false
      })
    }

    this.setData({
      items,
      meetingModel
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