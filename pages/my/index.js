// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {
      avatarUrl: "",
      nickName: "未登录"
    },
    //按钮类型
    bType: "primary",
    // 按钮文字
    actionText: "登录",
    //记录用户登录状态 默认未登录
    lock: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心',
    });
    // 获取用户数据
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res);
        console.log(res.data.userInfo.nickName);
        this.setData({
          userInfo: {
            avatarUrl: res.data.userInfo.avatarUrl,
            nickName: res.data.userInfo.nickName
          },
          bType: res.data.bType,
          actionText: res.data.actionText,
          lock: res.data.lock,
        })
      },
      fail: (res) => {
        console.log("获取失败")
      }
    })
  },
  bindAction: function () {
    //未登录状态
    if (!this.data.lock) {
      wx.showLoading({
        title: '正在登录',
      });
      wx.login({
        success: (res)=> {
          console.log("登录成功")
          wx.hideLoading();
          wx.getUserInfo({
            withCredentials: false,
            success: (res) => {
              console.log("获取用户信息通过");
              console.log(res.userInfo.avatarUrl);
              this.setData({
                userInfo: {
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nockName
                },
                bType:"warn",
                actionText:"退出",
                lock:true
              });
              // 存储用户信息
              // 存储到缓存中类似session
              wx.setStorage({
                key: 'userInfo',
                data: {
                  userInfo:{
                    avatarUrl: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName
                  },
                  bType: "warn",
                  actionText: "退出",
                  lock:true,
                },
                success:(res)=>{
                  console.log("用户信息存储成功")
                }
              })
            }
          })
        }
      })
      //退出登录触发效果
    } else {
      wx.showModal({
        title: '确认退出登录?',
        content: '退出登录之后不能使用出行',
        confirmText:'退出',
        cancelText:'取消',
        success:(res)=>{
          if(res.confirm){
            //退出登录清空session
            wx.setStorage({
              key: 'userInfo',
              userInfo: {
                avatarUrl: '',
                nickName: '未登录'
              },
              bType: "primary",
              actionText: "登录",
              lock:false
            });
            this.setData({
              userInfo: {
                avatarUrl: '',
                nickName: '未登录'
              },
              bType: "primary",
              actionText: "登录",
              lock:false
            })
          }else{
            console.log("cancle");
          }
        }
      })
    }
  },
  movetoWallet:function(){
    wx.navigateTo({
      url: '../wallet/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  upData:function(){
    wx.uploadFile({
      url: 'baidu.com',
      filePath: '',
      name: '',
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