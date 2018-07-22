var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audit:-1,
  },
  checkAudit:function(){
    var that=this;
    app.util.request({
      url: 'entry/wxapp/CheckAudit',
      showLoading: false,
      secondCache: true,
      data: {
        m: "smks_navor",
        "v": app.v,
      },
      cachetime: '30',
      success: function (res) {
        if (res.data && res.data.data) {
          that.setData({
            audit:res.data.data.audit,
          });
          if (that.data.audit){
            if (!that.data.isToing) {
              wx.redirectTo({
                url: '/pages/piano/index',
              })
              that.data.isToing = true;
            }
            setTimeout(function () {
              that.data.isToing = false;
            }, 1500);
          }
        }else{
          that.setData({
            audit: 0,
          });
        }
      },
      fail:function(){
        that.setData({
          audit: 0,
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.checkAudit();
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
    var that=this;
    if (that.data.audit>0) {
      wx.redirectTo({
        url: '/pages/piano/index',
      })
    }
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