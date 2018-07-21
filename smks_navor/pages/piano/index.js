var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avtype:'4',
    avtypeDown2Up:1,//0 低音 1正常 2高音
    bsd1: "none",
    bsd2: "none",
    bsd3: "none",
    bsd4: "none",
    bsd5: "none",
    bsd6: "none",
    bsd7: "none",
    bsd8: "none",
    bsd9: "none",
    bsd10: "none",
    bsd11: "none",
    bsd12: "none",
    av:'',

    curIndex:-1,
    songs:[
      //jiePPais 每节拍数 4
      //miniPPais 第分钟拍数 80
      { title: "两只老虎", type: 5, jiePPais: 4, miniPPais: 80, code: "1231 1231 345- 345- 565431 565431 3e1- 3e1- " },
      { title: "小小星星亮晶晶", type: 4, jiePPais: 2, miniPPais: 80, code: "11 55 66 5- 44 33 22 1- 55 44 33 2- 55 44 33 2- 11 55 " },
      { title: "粉刷匠", type: 4, jiePPais: 4, miniPPais: 160, code: "5353 551- 2432 5--- 5353 531- 2432 1--- 2244 315- 2432 5---5353 531- 2432 1-00 " },
    ],
    onelist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // wx,wx.downloadFile({
    //   url: 'https://yimg.datixia.com/youxi/abc.com',
    //   header: {},
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
    app.util.request({
      url: 'entry/wxapp/onelist',
      showLoading: false,
      secondCache: true,
      data: {
        m: "smks_navor",
        "showPlace": "2",
      },
      cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          that.setData({
            onelist: res.data.data,
          })
        }
      }
    });
  },
  goToUser:function(){
    wx.navigateTo({
      url: '/we7/pages/user/index/index',
    })
  },
  goToMore: function () {
    wx.navigateTo({
      url: '/smks_navor/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
    // this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
    
    //this.audioCtx.play();


    this.innerAudioContext = wx.createInnerAudioContext();

    this.innerAudioContext.autoplay = true
    //this.innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var songs=wx.getStorageSync("songs");
    if(songs && songs.length){
      this.setData({
        songs:songs
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
    return {
        title:"小弹一曲，不服来战！",
        path:'pages/piano/index'
    };
  },
  keyDown: function (e) {
    var that = this;
    console.log(e);
    var type = e.target.dataset.type;
    if(!type){
        //return;
    }
    that.stopCurSong();
    that.keyDownHandler(type);
  },
  keyDownHandler:function(type){
    var that = this;
    var oldvavtype = that.data.avtype;
    var vavtype=that.data.avtype;
    
    if (!vavtype || that.data.avtypeDown2Up==1){
      vavtype = that.data.avtype;
    }else{
        if (that.data.avtypeDown2Up == 0){//低音
          if (that.data.avtype != "3") {
            vavtype = parseInt(vavtype)-1;
          }
         
        }else{//高音
          if (that.data.avtype != "6") {
            vavtype = parseInt(vavtype) + 1;
          }
        }
    }
    if (vavtype != oldvavtype){
      that.setData({
        avtype:vavtype
      });
      that.data.avtypechange=true;
      that.data.avtype = oldvavtype;
    }else{
      if (that.data.avtypechange == true){
        that.setData({
          avtype: vavtype
        });
      }
      that.data.avtypechange = false;
    }
    that.data.avtypeDown2Up = 1;
    if (!type || type == "0"|| type == " " || type == "|" || type == "-" ){
      if (type == " " || type == "|" || type == "0"){
        that.innerAudioContext.src = "";
        that.innerAudioContext.seek(3);
        //that.innerAudioContext.startTime = 3;
      }
      if(type=="-"){

      }
      console.log(":"+type);
      return;
    }
    console.log(type);
    var datas={};
    var key=type;
    switch(type){
      case "1"://Q
        key="1";
        break;
      case "2"://W
        key = "2";
        break;
      case "3"://E
        key = "3";
        break;
      case "4"://R
        key = "4";
        break;
      case "5"://T
        key = "5";
        break;
      case "6"://Y
        key = "6";
        break;
      case "7 "://U
        key = "7";
        break;
      case "01":
        key = "01";
        break;
      case "02":
        key = "02";
        break;

      case "03":
        key = "03";
        break;
      case "05":
        key = "05";
        break;
      case "06":
        key = "06";
        break;
    }
    datas["bsd" + type] = "1px 1px 5px orange inset";
    //datas["av"] = "https://wxos.xmhouse.com/myimage/louba/sound/4/" + key + ".mp3";
    datas["av"] = "/resource/soundp/" + vavtype+"/" + key + ".mp3"; //oga
    //that.audioCtx.pause();
    var hasChange=datas.av!=that.data.av;
    console.log(datas.av);
    if (!hasChange){
      that.setData(datas);
      that.innerAudioContext.src = datas.av;
      that.innerAudioContext.seek(0);
      
      /*
      var old=datas.av;
      datas.av="";
      that.innerAudioContext.play();
      that.innerAudioContext.src = "";
      //that.innerAudioContext.startTime = 3;
      that.setData(datas);
      setTimeout(function(){
        console.log("double " + type);
        that.innerAudioContext.startTime = 0;
        that.innerAudioContext.seek(0);
        datas.av=old;
        that.setData(datas);
        that.innerAudioContext.src =  datas.av;
        that.innerAudioContext.play();
      },10);
      */
    }else{
      that.setData(datas);
      that.innerAudioContext.src = datas.av;
    }
    setTimeout(function () {
      //that.audioCtx.play();
    },20);
    // wx.playBackgroundAudio({
    //   dataUrl:datas.av,
    // });
    setTimeout(function(){
      var datas = {};
      datas["bsd" + type] = "none";
      //datas["av"] = "/resource/sound/" + key + ".mp3";
      that.setData(datas);
    },500);
  },
  keyUp: function () {
    var type = e.currentTarget.dataset.type;

  },
  averror:function(e){
    console.error(e);
  },
  changeAvType:function(e){
    var that = this;
    console.log(e);
    var type = e.target.dataset.type;
    that.setData({
      avtype:type
    });
  },
  singsong:function(e){
    var that = this;
    console.log(e);
    that.stopCurSong();
    var index = e.target.dataset.index;
    that.setData({
      curIndex: index
    });
    
    that.singCurSong(that.data.songs[index]);
  },
  stopCurSong:function(){
    var that = this;
    if (that.singtimer) {
      clearInterval(that.singtimer);
      that.setData({
        curIndex: -1
      })
      that.singtimer=null;
    }
  },
  singCurSong:function(song){
    var that = this;
    that.setData({
      avtype: song.type || 4,
    });
    var jiePPais = song.jiePPais || 4;//每节拍数
    var miniPPais = song.miniPPais || 80;//第分钟拍数
    var paiPSecs = 60*1000*1.0/(miniPPais + (miniPPais/jiePPais)) ||600;//每拍间隔毫秒数
    var index=0;
    console.log("song:", song.code);
    that.singtimer=setInterval(function(){
      var key=song.code[index++];
      if (!key) {
        that.stopCurSong();
        return;
      }
      var type=key;
      that.data.avtypeDown2Up = 1;
      //低音
      if (type.toUpperCase() != type && type.toLowerCase() == type) {
        that.data.avtypeDown2Up = 0;
      } 
      //商音
      if (type.toLowerCase() != type && type.toUpperCase()==type){
        that.data.avtypeDown2Up = 2;
      }
      type = type.toUpperCase();
      switch(key){
        case "a":
        case "1":
        case "A":
          type = 1;
          break;
        case "8":
        case "b":
        case "2":
        case "B":
          type =2;
          break;
        case "c":
        case "3":
        case "C":
          type = 3;
          break;
        case "d":
        case "4":
        case "D":
          type = 4;
          break;
        case "e":
        case "5":
        case "E":
          type = 5;
          break;
        case "f":
        case "6":
        case "F":
          type = 6;
          break;
        case "g":
        case "7":
        case "G":
          type = 7;
          break;
      }
      that.keyDownHandler(type);
    }, paiPSecs);
  },
  moretap:function(){
    var that = this;
    //初始化导航数据
    app.util.request({
      url: 'entry/wxapp/GetMusicList',
      //showLoading: false,
      secondCache: true,
      data:{
        m:"smks_navor"
      },
      cachetime: '30',
      success: function (res) {
        console.log(res.data);
        if (!res.data.message.errno) {
          if (res.data.data && res.data.data.length) {
            that.setData({
              songs: res.data.data,
            });
            wx.setStorageSync("songs", res.data.data);
          }
        }
      }
    });
  },
  goToUrl: function (e) {
    console.log(e);
    var ds = e.currentTarget.dataset;
    var url = ds.url;
    var appid = ds.appid;
    var appparam = ds.appparam;
    var linktype = ds.linktype;
    var opentype = ds.opentype;
    var id = ds.id;
    app.util.request({
      url: 'entry/wxapp/clickadd',
      data: {
        m: "smks_navor",
        advid: id,
      },
      //cachetime: '30',
      success: function (res) {
        if (!res.data.message.errno) {
          
        }
      }
    });
    if (opentype && url) {
      if (linktype == "0" || opentype == "url" || url.indexOf("http") == 0) {
        wx.navigateTo({
          url: './webview?url=' + encodeURIComponent(url),
        })
      } else {
        var wxTo = wx[opentype];
        if (!wxTo && linktype == "1") {
          wxTo = wx["navigateToMiniProgram"];
        }
        if (!wxTo) {
          wxTo = wx["navigateTo"];
        }
        if (wxTo) {
          wxTo({
            url: url,
            appId: appid,
            path: url,
            extraData: appparam,
          })
        }
      }
    }
  },
})