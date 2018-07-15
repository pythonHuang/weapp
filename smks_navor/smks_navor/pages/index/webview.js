// smks_navor/pages/index/webview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    title:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var title = options.url || "";
    if(title){
      that.setData({
        title:title,
      })
    }
    var url = options.url || "";
    that.goToUrl(url);
  },
  goToUrl:function(url){
    var that = this;
    url=decodeURIComponent(url||"");
    if(url){
      if(url.indexOf("http://")>-1){
        url = url.replace("http://","https://");
      }else if(url.indexOf("https://")>-1){
        url = "https://" + url;
      }
    }
    that.setData({
      url: url,
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
  onShareAppMessage: function (e) {
    console.log(e);
    var title=this.data.title;
    return {
      title: title,
      path: "/smks_navor/index/webview?url=" + encodeURIComponent(e.webViewUrl)+
        "&title="+encodeURIComponent(title),
    }
  }
})