//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    navs: [],
    slide: [],
    commend: [],
    userInfo: {},
    swiperlist:[],
    icon3list:[],
    icon5list: [],
    onelist:[],
    towlist:[],
    threelist:[],
    contentlist:[],
    items:[],
    songs:[],
  },
  onLoad: function () {
    var that = this
    app.util.footer(that);

    
    //初始化导航数据
    app.util.request({
      url: 'entry/wxapp/GetMusicList',
      cachetime: '30',
      success: function (res) {
        console.log(res.data);
        if (!res.data.message.errno) {
          that.setData({
            songs: res.data.data,
          });
          if (res.data.data && res.data.data.length){
            wx.setStorageSync("songs", res.data.data);
          }
        }
      }
    });
    //初始化导航数据
    app.util.request({
      'url': 'wxapp/home/nav',
      'cachetime': '30',
      success: function (res) {
        if (!res.data.message.errno) {
          console.log(res.data.message.message)
          that.setData({
            navs: res.data.message.message,
          })
          
        }
      }
    });
    app.util.request({
      'url': 'wxapp/home/slide',
      'cachetime': '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            slide: res.data.message.message,
          })
        }
      }
    });
    app.util.request({
      url: 'wxapp/home/commend',
      cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            commend: res.data.message.message,
          })
        }
      }
    });

    //
    app.util.request({
      url: 'entry/wxapp/swiperlist',
      //cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            swiperlist: res.data.data,
          })
        }
      }
    });
    app.util.request({
      url: 'entry/wxapp/icon3list',
      //cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            icon3list: res.data.data,
          })
        }
      }
    });
    app.util.request({
      url: 'entry/wxapp/icon5list',
      //cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            icon5list: res.data.data,
          })
        }
      }
    });
    
    app.util.request({
      url: 'entry/wxapp/onelist',
      //cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            onelist: res.data.data,
          })
        }
      }
    });
    app.util.request({
      url: 'entry/wxapp/twolist',
      //cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            twolist: res.data.data,
          })
        }
      }
    });
    app.util.request({
      url: 'entry/wxapp/threelist',
      //cachetime: '30',
      success: function (res) {
        console.log(res.data);
        if (!res.data.message.errno) {
          that.setData({
            threelist: res.data.data,
          })
        }
      }
    });
    app.util.request({
      url: 'entry/wxapp/contentlist',
      //cachetime: '30',
      success: function (res) {
        console.log(res.data);
        if (!res.data.message.errno) {
          that.setData({
            contentlist: res.data.data,
          })
        }
      }
    });
  },
  goToUrl:function(e){
    console.log(e);
    var ds = e.currentTarget.dataset;
    var url=ds.url;
    var appid = ds.appid;
    var appparam = ds.appparam;
    var linktype = ds.linktype;
    var opentype = ds.opentype;
    var id = ds.id;
    app.util.request({
      url: 'entry/wxapp/clickadd',
      data:{
        advid:id,
      },
      //cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            onelist: res.data.data,
          })
        }
      }
    });
    if (opentype && url){
      if (linktype == "0" || opentype=="url" || url.indexOf("http")==0){
        wx.navigateTo({
          url: './webview?url='+encodeURIComponent(url),
        })
      }else{
        var wxTo = wx[opentype];
        if (!wxTo && linktype=="1") {
          wxTo = wx["navigateToMiniProgram"];
        }
        if (!wxTo) {
          wxTo = wx["navigateTo"];
        }
        if (wxTo) {
          wxTo({
            url: url,
            appId:appid,
            path:url,
            extraData: appparam,
          })
        }
      }
    }
  }
});
