// pages/result/result.js
//获取应用实例
const app = getApp()
var id1
var id2
var id3
var id4
var id5
var id6
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: "WOMAN",
    motto: "柴犬君，正在为你鉴定...",
    userInfo: {},
    checking: false,
    questionIndex:0,
    showBg:false,
    constellations: {
      "0": {
        "answer": ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天枰', '天蝎', '射手', '摩羯', '水瓶', '双鱼'],
        objectArray: [
          {
            id: 0,
            name: '白羊',
            checked:'true'
          },
          {
            id: 1,
            name: '金牛'
          },
          {
            id: 2,
            name: '双子'
          },
          {
            id: 3,
            name: '巨蟹'
          },
          {
            id: 4,
            name: '狮子'
          },
          {
            id: 5,
            name: '处女'
          },
          {
            id: 6,
            name: '天枰'
          },
          {
            id: 7,
            name: '天蝎'
          },
          {
            id: 8,
            name: '射手'
          },
          {
            id: 9,
            name: '摩羯'
          },
          {
            id: 10,
            name: '水瓶'
          },
          {
            id: 11,
            name: '双鱼'
          },
        ],
        "question": "这么优秀的你，竟然还单身？莫非你的星座是",
        "title": "星座选择"
      },
      "1": {
        "answer": ['红', '橙', '黄', '绿', '青', '蓝', '紫', '黑', '白', '灰', '粉','棕色'],
        objectArray: [
          {
            id: 0,
            name: '红',
            checked: 'true'
          },
          {
            id: 1,
            name: '黄'
          },
          {
            id: 2,
            name: '白'
          },
          {
            id: 3,
            name: '蓝'
          },
        ],
        "question": "相对而言，你更喜欢一下哪个颜色",
        "title": "颜色选择"
      },


    },
    index: 0,
    answerOne:0,
    answerTwo:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    app.getAppStatus()
    this.setData({
      sex: options.sex
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    // id1=setTimeout(function () {
    //   that.setData({
    //     showBg: true,
    //     index:1
    //   })
    // }, 700)
    // id2=setTimeout(function () {
    //   that.setData({
    //     showBg: false,
    //     index: 3
    //   })
    // }, 1200)
    // id3=setTimeout(function () {
    //   that.setData({
    //     showBg: true,
    //     index: 5
    //   })
    // }, 1700)
    // id4=setTimeout(function () {
    //   that.setData({
    //     showBg: false,
    //     index: 9
    //   })
    // }, 2200)
    // id5 = setTimeout(function () {
    //   that.setData({
    //     showBg: true,
    //     index: 11
    //   })
    // }, 2700)
    // id6 = setTimeout(function () {
    //   that.setData({
    //     showBg: false,
    //     index: 6
    //   })
    //   that.onShow()
    // }, 3200)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearTimeout(id1)
    clearTimeout(id2)
    clearTimeout(id3)
    clearTimeout(id4)
    clearTimeout(id5)
    clearTimeout(id6)

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.questionIndex===0){
      this.setData({
        index: e.detail.value,
        answerOne: e.detail.value
      })
    }else{
      this.setData({
        index: e.detail.value,
        answerTwo: e.detail.value
      })
    }
    
  },
  nextQuestion: function(e) {
    if (this.data.questionIndex<=1){
      this.setData({
        questionIndex: this.data.questionIndex + 1
      })
    }
    this.onShow()
      
  },
  makeResult:function(e){
      wx.navigateTo({
        url: '/pages/make/make?answerOne='+this.data.answerOne+'&answerTwo='+this.data.answerTwo+'&plan=false',
      })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return {
      title: '权威单身原因鉴定，大数据分析，助你快递脱单。',
      path: '/pages/index/index',
      imageUrl: '/images/dog.jpg'
    }

  },
  clearTime:function(){
    this.onHide()
  }
})