// pages/index/index.js
//index.js
var utils = require('../../utils/util.js')
Page({
  data: {
    scale: 18, // 缩放级别，默认18，数值在0~18之间
    // latitude: 0, // 给个默认值
    // longitude: 0 // 给个默认值
  },
  onLoad: function (options) {
    console.log(utils.formatTime(new Date()));
    // 1.页面初始化 options为页面跳转所带来的参数
    var that = this;
    //获取计时器 查看是否开始计费
    that.timer = options.timer;
    //地图上控件
    //根据设备信息添加控件
    wx.getSystemInfo({
      success: (res) => {
        // console.log("调用获取设备信息");
        that.setData({
          controls: [{
            id: 1, //id   定位自身位置
            iconPath: 'images/dingwei.png', //图标
            position: {  //控件位置
              left: 20,
              top: res.windowHeight - 80,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 2, //id   找车
            iconPath: 'images/find.png', //图标
            position: {  //控件位置
              left: res.windowWidth / 2 - 45,
              top: res.windowHeight - 100,
              width: 90,
              height: 90,
            },
            clickable: true
          },
          {
            id: 3, //id   报障
            iconPath: 'images/me.png', //图标
            position: {  //控件位置
              left: res.windowWidth - 70,
              top: res.windowHeight - 80,
              width: 50,
              height: 50,
            },
            clickable: true
          },
          {
            id: 4, //id   地图标识
            iconPath: 'images/dibiao.png', //图标
            position: {  //控件位置
              left: res.windowWidth / 2 - 11,
              top: res.windowHeight / 2 - 45,
              width: 22,
              height: 45,
            },
            clickable: true
          },
          {
            id: 5, //id 个人图标
            iconPath: 'images/t3.png', //图标
            position: {  //控件位置
              left: res.windowWidth - 68,
              top: res.windowHeight - 155,
              width: 45,
              height: 45,
            },
            clickable: true
          },
          {
            id: 6, //id 个人图标
            iconPath: 'images/t3.png', //图标
            position: {  //控件位置
              left: res.windowWidth - 150,
              top: res.windowHeight - 155,
              width: 45,
              height: 45,
            },
            clickable: true
          },
          ]
        })

      },
    }),

      //调用API获取当前位置设置经纬度
      wx.getLocation({
        type: 'gcj02',    //参数类型
        altitude: true,   //是否高精度
        //接口成功回调函数
        success: (res) => {
          var that = this;
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
        },
      }),
      //定位车位置
      wx.request({
        url: 'https://www.easy-mock.com/mock/5ae2eea23fbbf24d8cd7f0b4/zdz',
        method: 'GET',
        success: (res) => {
          console.log(res.data.data);
          this.setData({
            markers: res.data.data
          })
        }
      })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    // mapCtx绑定map组件 设置地图中心为当前定位
    this.mapCtx = wx.createMapContext("appMap");
    this.movetoLocation();
  },
  movetoLocation: function () {
    this.mapCtx.moveToLocation();
  }
  ,
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //地图控件点击事件
  bindcontrolTap: function (e) {
    console.log("点击触发");
    switch (e.controlId) {
      case 1:
        this.movetoLocation();
        break;
      case 2:
        //判定是否开始计时
        if (this.timer === "" || this.timer === undefined) {
          wx.scanCode({
            success: (res) => {
              wx.showLoading({
                title: '正在获取密码',
                mask: true
              });
              console.log("二维码数据");
              console.log(res);
              wx.request({
                url: 'https://www.easy-mock.com/mock/5ae2eea23fbbf24d8cd7f0b4/reposeTest/password',
                data: {},
                header: {
                  'content-type': 'application/json'
                },
                method: 'GET',
                success: function (res) {
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '../scanresult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                    success: function (res) {
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })
                },
                fail: function (res) {
                  wx.showToast({
                    title: '获取失败',
                  })
                }
              })

            }
          })
          //处于计时阶段
        } else {
          wx.redirectTo({
            url: '../billing/index',
          });
        }
        break;
      // 跳转报障页面
      case 3:
        wx.navigateTo({
          url: '../warn/index',
        });
        break;
      //个人页面
      case 5:
        wx.navigateTo({
          url: '../my/index?timer=' + this.timer,
        })
        break;
      //测试页面
      case 6:
        wx.navigateTo({
          url: '../test/index',
        })
        break;
      default:
        break;
    }
  },

  //两点之间连线
  bindmarkertap: function (e) {
    let _markers = this.data.markers; //获取车辆标记点数组
    let markerId = e.markerId;  //获取标记Id
    let currMarker = _markers[markerId - 1];  //通过id获取标记
    this.setData({
      polyline: [{
        // 起始点      
        points: [{ latitude: this.data.latitude, longitude: this.data.longitude },
        //终点
        { latitude: currMarker.latitude, longitude: currMarker.longitude }
        ],
        color: "#FF0000DD",//线颜色
        width: 1,
        dottedLine: true
      }]
    })
  },

  // 地图被移动时触发
  bindregionchange: function (e) {
    //拖动过程
    if (e.type == "begin") {
      //请求数据点
      wx.request({
        url: 'https://www.easy-mock.com/mock/5ae2eea23fbbf24d8cd7f0b4/moveofo',
        data: {},
        method: 'GET',
        success: (res) => {
          // wx.showToast({
          //   title: '动态',
          // });
          console.log(res.data.data);
          //获取点赋值
          this.setData({
            _markers: res.data.data
          })
        }
      })
      //停止移动动作
    } else if (e.type == "end") {
      // wx.showToast({
      //   title: '停止',
      // })
      console.log(this.data._markers)
      this.setData({
        markers: this.data._markers
      })

      console.log("markers数据:")
      console.log(this.data.markers)
    }
  }
})