//index.js
//获取应用实例
const app = getApp()
var degId

Page({
  data: {
    items: [{
        name: 'MAN',
        value: '男生'
      },
      {
        name: 'WOMAN',
        value: '女生',
        checked: 'true'
      },
    ],
    motto: '权威单身鉴定，祝你快速脱单',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sex: 'WOMAN',
    deg: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    let that = this
    let deg = that.data.deg ? false : true
    degId = setTimeout(function() {
      clearTimeout(degId)
      that.setData({
        deg: deg
      })
      that.onShow()
    }, 1500)
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.errMsg != "getUserInfo:fail auth deny") {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      let type = e.currentTarget.dataset.type;
      if (type == 'AI') {

        wx.navigateTo({
          url:   '/pages/result/result?sex=' + this.data.sex + '&plan=false',
        })
      } else {
        wx.navigateTo({
          url:   '/pages/make/make?sex=' + this.data.sex + '&plan=true&answerOne=' + Math.ceil(Math.random() * 11) + '&answerTwo=' + Math.ceil(Math.random() * 11),
        })
      }


    } else {

    }

  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value.length == 2) {
      if (this.data.items[0].checked == 'true') {
        this.setData({
          items: [{
              name: 'MAN',
              value: '男生'
            },
            {
              name: 'WOMAN',
              value: '女生',
              checked: 'true'
            },
          ],
          sex: 'WOMAN'
        })
      } else {
        this.setData({
          items: [{
              name: 'MAN',
              value: '男生',
              checked: 'true'
            },
            {
              name: 'WOMAN',
              value: '女生'
            },
          ],
          sex: 'MAN'
        })
      }

    }

  },
  rewrite: function(e) {
    let url = e.currentTarget.dataset.url;
    let plan = e.currentTarget.dataset.plan;
    if (url) {
      console.log(plan)
      if (!plan) {
        wx.navigateTo({
          url: url + '?sex=' + this.data.sex + '&plan=false',
        })
      } else {
        wx.navigateTo({
          url: url + '?sex=' + this.data.sex + '&plan=true&answerOne=' + Math.ceil(Math.random() * 11) + '&answerTwo=' + Math.ceil(Math.random() * 11),
        })
      }

    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '权威单身原因鉴定，大数据分析，助你快递脱单。',
      path: '/pages/index/index',
      imageUrl: '/images/dog.jpg'
    }

  },
  onHide:function(){
      clearTimeout(degId)

  }
})