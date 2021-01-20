// pages/make/make.js
//获取应用实例
const app = getApp()
var id
var degId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    openSettingBtnHidden: true,
    userInfo: {},
    motto: {
      0: "时间",
      1: "天气",
      2: "性别",
      3: "微信昵称",
      4: "微信头像",
      5: "操作轨迹"
    },
    mottoIndex: 0,
    mottoValue: '位置',
    plan: false,
    result: {
      0: '不会撩，时常把一段感情聊成友谊，脱单地点:旅行途中',
      1: '看起来不像是单身，脱单地点:家附近',
      2: '因为迷惘，脱单地点:街头',
      3: '如果你不联系我，我也绝不会联系你，就这样，脱单地点:公司',
      4: '颜值控，谁都瞧不上，要温柔霸道上进腹黑条件好，脱单地点:聚会上',
      5: '觉得自己什么事情不说，你必须得懂我，脱单地点:书店',
      6: '颜值控，有感情洁癖，喜欢上我之后，我就不想理你了，脱单地点:健身房',
      7: '宁愿孤独，也不愿滥情，脱单地点:家附近',
      8: '暧昧时觉得什么都是好的，但是不好就立刻分手，脱单地点:酒吧',
      9: '非要等到喜欢的人，喜欢上自己再表白，脱单地点:便利店',
      10: '喜欢自由自在，不喜欢被束缚，不爱凑合，也不动心，脱单地点:校园里',
      11: '太任性了，眼光也太高了，脱单地点:奶茶店'
    },
    probability: {
      0: "2020年脱单概率85%",
      1: "2020年脱单概率73%",
      2: "2020年脱单概率25%",
      3: "2020年脱单概率1%",
      4: "2020年脱单概率55%",
      5: "2020年脱单概率95%",
      6: "2020年脱单概率99%",
      7: "2020年脱单概率17%",
      8: "2020年脱单概率0%",
      9: "2020年脱单概率94%",
      10: "2020年脱单概率83%",
      11: "2020年脱单概率99%",
    },
    deg: false,
    isOnline:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(that.data.plan)
    app.getAppStatus()
    if (that.data.plan == false) {
      that.setData({
        plan: options.plan,
        answerOne: options.answerOne,
        answerTwo: options.answerTwo
      })
    }
    console.log(that.data.plan)
    if (that.data.plan == false) {
      console.log('佛系鉴定')
      that.selectMotto()



    } else {
      console.log('AI鉴定')
      that.setData({
        motto: {
          0: "星座",
          1: "颜色",
          2: "性别",
          3: "微信昵称",
          4: "微信头像",
          5: "操作轨迹"
        },
      })
      that.selectMotto()

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.powerPopup = this.selectComponent("#powerPopup");

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    let deg = that.data.deg ? false : true
    that.data.isOnline=app.globalData.isOnline
    degId = setTimeout(function() {
      clearTimeout(degId)
      that.setData({
        deg: deg
      })
      that.onShow()
    }, 1500)
    let posterUrl = ''
    that.setData({
      userInfo: app.globalData.userInfo,
    })
    wx.getImageInfo({
      src: that.data.userInfo.avatarUrl,
      // src: 'https://wscdn.xiaoma.cn/26/37/14/263714a5e1136ca34f5defed80d7b0f4dddfaf90.jpg',
      success(res) {
        console.log(res)
        //海报地址
        posterUrl = res.path
        // 获取屏幕宽高
        var wth; // 屏幕宽
        wx.getSystemInfo({
          success: function(res) {
            wth = res.windowWidth;
          }
        })
        var context = wx.createCanvasContext('canvpos'); // 创建并返回绘图上下文

        that.getCanvas(posterUrl, context, wth)



      },
      fail(res) {
        console.log(res)
      }
    })
    setTimeout(function() {
      that.setData({
        loading: false
      })
    }, 5000)


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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
  getCanvas: function(filePath, context, wth) {
    let that = this;
    var img = filePath;
    let mainImage = that.data.isOnline ?'/images/signCheck.jpg':'/images/signCheck1.jpg'
    setTimeout(function() {
        clearTimeout(degId)
      },
      5000
    )

    console.log(img)
    console.log(wth)
    
    context.drawImage(mainImage, 0, 0, 653 * (wth / 750), 1355 * (wth / 750)) // 主图
    context.save(); //保存原有的画图
    context.beginPath() //重新开始
    context.arc( //绘制圆心坐标为(x,y),半径为132的圆
      Math.floor((654 / 2) * (wth / 750)),
      Math.floor((1355 / (566 / 92.7)) * (wth / 750)),
      Math.floor(66 * (wth / 750)),
      0,
      2 * Math.PI
    );
    context.clip() //裁剪
    context.drawImage( //定位在圆圈范围内便会出现
      img, //图片暂存路径
      Math.floor(((654 / 2) - 66) * (wth / 750)),
      Math.floor(((1355 / (566 / 92.7)) - 66) * (wth / 750)),
      Math.floor(132 * (wth / 750)),
      Math.floor(132 * (wth / 750))
    );

    // context.save();  //保存原有的画图
    // context.beginPath()  //重新开始
    // context.draw()
    // context.drawImage(img, 122, 70, 80, 80) // 主图
    context.restore()
    // context.drawImage('/images/code.jpg', 440 * (wth / 750), 1100 * (wth / 750), 200 * (wth / 750), 200 * (wth / 750)) // 小程序码
    context.setFontSize(40 * (wth / 750))
    context.setFillStyle("#0d1538")
    let string = that.data.result[that.data.answerOne]
    let stringArr = string.split('，');
    console.log(stringArr)
    // context.fillText(that.data.userInfo.nickName, 60 * (wth / 750), 600 * (wth / 750))
    for (var i = 0; i < stringArr.length; i++) {
      let initY = 780 - (stringArr.length*40)
      if (stringArr.length === 1) {
        context.fillText(stringArr[i], ((653 * (wth / 750)) - (context.measureText(stringArr[i]).width)) / 2, initY * (wth / 750))
        context.fillText(that.data.probability[that.data.answerTwo], ((653 * (wth / 750)) - (context.measureText(stringArr[i]).width)) / 2, (initY+80) * (wth / 750))
      } else {
        if (i == (stringArr.length - 1)) {
          context.setFontSize(35 * (wth / 750))
        }
        context.fillText(stringArr[i], ((653 * (wth / 750)) - (context.measureText(stringArr[i]).width)) / 2, ((initY + (i * 80))) * (wth / 750))
        console.log(i)
        console.log(stringArr.length - 1)
        if (i == (stringArr.length - 1)) {
          console.log('画概率')
          context.fillText(that.data.probability[that.data.answerTwo], ((653 * (wth / 750)) - (context.measureText(that.data.probability[that.data.answerTwo]).width)) / 2, ((initY + (i * 80)) + 80) * (wth / 750))
          context.setFontSize(25 * (wth / 750))
          context.setFillStyle("#F14E0E")
          context.fillText('by python scipy', ((653 * (wth / 750)) - (context.measureText('by python scipy').width)) / 2, 1050 * (wth / 750))
          context.fillText('scipy是一个高级的科学计算库', ((653 * (wth / 750)) - (context.measureText('scipy是一个高级的科学计算库').width)) / 2, 1080 * (wth / 750))
        }
      }
      


    }
    // context.setFontSize(35 * (wth / 750))
    // context.setFillStyle("#131300")
    // context.fillText('长按识别', 55 * (wth / 750), 1200 * (wth / 750), 150 * (wth / 750))
    // context.fillText('AI鉴定单身原因', 55 * (wth / 750), 1250 * (wth / 750))

    context.draw()
  },
  selectMotto: function() {
    let that = this
    clearTimeout(id)
    if (that.data.mottoIndex < 5) {
      id = setTimeout(function() {
        that.setData({
          mottoValue: that.data.motto[that.data.mottoIndex],
          mottoIndex: that.data.mottoIndex + 1
        })
        that.onLoad()
      }, 1000)

    }


  },
  _savaImageToPhoto: function(e) {

    let that = this;
    wx.showLoading({
      title: '生成图片中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'canvpos',
      success: function(res) {
        that.setData({
          canvasTemppath: res.tempFilePath,
        })
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: that.data.canvasTemppath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1500
            })

          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  saveCanvas: function() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { //这里是用户同意授权后的回调
              that._savaImageToPhoto();
            },
            fail() { //这里是用户拒绝授权后的回调
              that.setData({

                openSettingBtnHidden: false
              })
            }
          })
        } else { //用户已经授权过了
          that._savaImageToPhoto();
        }
      }
    })
  },
  closePowerPopup: function() {
    this.powerPopup.hide()
  },
  handleSetting: function(e) {

    let that = this;
    that.powerPopup.show()

    that.setData({

      openSettingBtnHidden: false
    })

    that.setData({

      openSettingBtnHidden: true
    })

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
  onHide: function () {
    clearTimeout(degId)
    clearTimeout(id)

  }
})