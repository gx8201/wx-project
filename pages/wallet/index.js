// pages/wallet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //余额
    overage: 0,
    //优惠券
    ticket: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的钱包',
    });
    //更新钱包数据( 页面 )
    //加sync同步更新数据
    wx.getStorage({
      key: 'overage',
      success: (res) => {
        this.setData({
          //读取缓存数据
          overage: res.data.overage
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示 获取本地存储数据
   */
  onShow: function () {
    wx.getStorage({
      key: 'overage',
      success: (res) => {
        this.setData({
          overage: res.data.overage
        })
      },
    })
  },
  // 余额说明
  overageDesc:function(){
    wx.showModal({
      title: '余额说明',
      content: '充值余额+活动赠送金额',
      showCancel:false,
      confirmText:"知道了",
    })
  },
  //跳转充值页面
  movetoCharge:function(){
    wx.redirectTo({
      url: '../charge/index',
    })
  },
  // 单车使用券
  showTicket:function(){
    wx.showModal({
      title: '',
      content: '你没有使用券了',
      showCancel:false,
      confirmText:'了解',
    })
  },
  // 退还押金
  showDeposit:function(){
    wx.showModal({
      title: '押金退还',
      content: '押金会立即退还,你将不能继续使用单车,是否确认退款?',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: (res)=> {
        if(res.confirm){
          wx.showToast({
            title: '退款成功',
            icon:'success',
            duration:2000
          })
        }else{
          a
        }
      },
    })
  },
  // 关于程序说明
  showInvcode:function(){
    wx.showModal({
      title: '共享单车',
      content: '微信公众号^^^=^^^',
      showCancel: false,
      confirmText: '了解',
    })
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

  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
})