// pages/scanresult/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time :9,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取密码
    this.setData({
      password: options.password
    });
    // 设置计时器初始值
    let time = 9;
    //计时开始
    this.timer = setInterval(()=>{
        this.setData({
          // 倒计时
          time : --time
        })
        console.log(time);
        // 读秒完成跳转计费页面
        if(time === 0){
          clearInterval(this.timer)
          wx.redirectTo({
            url: '../billing/index?number='+options.number,
          })
        }
    },1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 点击去首页报障
   */
  moveToWarn:function(){
    //清空计时器
    clearInterval(this.timer);
    wx.redirectTo({
      url: '../index/index',
    })
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