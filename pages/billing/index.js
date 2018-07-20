// pages/billing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours: 0,
    minuters: 0,
    seconds: 0,
    billing: "正在计费"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数据并赋值
    this.setData({
      number: options.number,
      timer: this.timer,
    });
    console.log(this.data.timer);
    let s = 0;
    let m = 0;
    let h = 0;
    this.timer = setInterval(() => {
      this.setData({
        seconds: s++
      });
      if (s == 60) {
        s = 0;
        m++;
        setTimeout(() => {
          this.setData({
            minuters: m,
          });
        }, 1000);
        if (m == 60) {
          m = 0;
          h++;
          setTimeout(() => {
            this.setData({
              hours: h,
            })
          }, 1000);
        }
      }
    }, 1000);
  },
  // 结束骑行
  endRide: function () {
    // 清空计时器
    clearInterval(this.timer);
    this.timer = "";
    this.setData({
      billing:"本次骑行结束",
      disabled:true,
    });
  },
  // 跳转主页
  moveToIndex:function(){
      wx.redirectTo({
        url: '../index/index?timer='+this.timer,
      });
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