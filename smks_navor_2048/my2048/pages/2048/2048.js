var app = getApp();

var Grid = require('./grid.js');
var Tile = require('./tile.js');
var GameManager = require('./game_manager.js');

var config = {
    data: {
        hidden: false,

        // 游戏数据可以通过参数控制
        grids: [],
        over: false,
        win: false,
        score: 0,
        highscore: 0,
        overMsg: '游戏结束',
      audit: -1,
    },
    checkAudit: function () {
      var that = this;
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
              audit: res.data.data.audit,
            });
            if (that.data.audit) {
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
          } else {
            that.setData({
              audit: 0,
            });
          }
        },
        fail: function () {
          that.setData({
            audit: 0,
          });
        }
      });
    },
    onShareAppMessage: function () {
      return {
        title:"小试牛刀，不服来战！",
        path:"my2048/pages/2048/2048",
      }
    },
    onShow: function () {
      var that = this;
      
    },
    onLoad: function() {
      var that = this;
      that.checkAudit();
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
        this.GameManager = new GameManager(4);

        this.setData({
            grids: this.GameManager.setup(),
            highscore: wx.getStorageSync('highscore') || 0
        });

    },
    onReady: function() {
        var that = this;

        // 页面渲染完毕隐藏loading
        that.setData({
            hidden: true
        });
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },

    // 更新视图数据
    updateView: function(data) {
        // 游戏结束
        if(data.over){
            data.overMsg = '游戏结束';
        }

        // 获胜
        if(data.win){
            data.overMsg = '恭喜';
        }

        this.setData(data);
    },

    // 重新开始
    restart: function() {
        this.updateView({
            grids: this.GameManager.restart(),
            over: false,
            won: false,
            score: 0
        });
    },

    touchStartClienX: 0,
    touchStartClientY: 0,
    touchEndClientX: 0,
    touchEndClientY: 0,
    isMultiple: false, // 多手指操作

    touchStart: function(events) {

        // 多指操作
        this.isMultiple = events.touches.length > 1;
        if (this.isMultiple) {
            return;
        }

        var touch = events.touches[0];

        this.touchStartClientX = touch.clientX;
        this.touchStartClientY = touch.clientY;

    },

    touchMove: function(events) {
        var touch = events.touches[0];
        this.touchEndClientX = touch.clientX;
        this.touchEndClientY = touch.clientY;
    },

    touchEnd: function(events) {
        if (this.isMultiple) {
            return;
        }

        var dx = this.touchEndClientX - this.touchStartClientX;
        var absDx = Math.abs(dx);
        var dy = this.touchEndClientY - this.touchStartClientY;
        var absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 10) {
            var direction = absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);

            var data = this.GameManager.move(direction) || {
                grids: this.data.grids,
                over: this.data.over,
                won: this.data.won,
                score: this.data.score
            };

            var highscore = wx.getStorageSync('highscore') || 0;
            if(data.score > highscore){
                wx.setStorageSync('highscore', data.score);
            }

            this.updateView({
                grids: data.grids,
                over: data.over,
                won: data.won,
                score: data.score,
                highscore: Math.max(highscore, data.score)
            });

        }

    }
};

Page(config);
