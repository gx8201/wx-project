// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrls: [],
    // 故障车号码 备注
    inputValue: {
      number: 0,
      desc: ""
    },

    // 故障类型数组
    checkboxValue: [],
    // 选取图片提示信息
    actionText: "拍照/照片",
    //提交按钮背景颜色 没有选定任何属性时没有颜色
    btnBgx: "",
    itemsValue: [
      {
        checked: false,
        value: "私锁私用",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "私锁私用",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "私锁私用",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "私锁私用",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "私锁私用",
        color: "#b9dd08"
      },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '故障报修',
    })
  },
  checkboxChange: function (e) {
    let _value = e.detail.value;
    if (_value.lenght == 0) {
      this.setData({
        btnBgc: ""
      });
    } else {
      this.setData({
        checkboxValue: _value,
        btnBgc: "#b9dd08"
      })
    }
  },
  // 车辆编号输入
  numberChange: function (e) {
    this.setData({
      inputValue: {
        number: e.detail.value,
        desc: this.data.inputValue.desc
      }
    })
  },
  formSubmit: function () {
    console.log("提交");
    //报障图片跟报障原因必填
    if (this.data.picUrls != null && this.data.checkboxValue != null) {
      wx.request({
        // 模拟提交数据
        url: 'https://www.easy-mock.com/mock/5ae2eea23fbbf24d8cd7f0b4/',
        data: {
          picUrls: this.data.picUrls,
          checkboxValue: this.data.checkboxValue,
          inputValue: this.data.inputValue,
        },
        method: "GET",
        // 成功回调
        success: (res) => {
          wx.showToast({
            title: res.data.data.msg,
            icon: "success",
            duration: 2000
          });
          wx.navigateBack({
            data:1
          })
        }
        //
      })
    } else {
      wx.showModal({
        title: '填写反馈信息',
        content: '请填写反馈信息',
        confirmText: "填写",
        cancelText: "返回",
        success: (res) => {
          if (res.confirm) {
            //继续填写
          } else {
            console.log("break反馈");
            wx.navigateBack({
              data: 1//回退到前一个页面
            })
          }
        },
      })
    }
  },
  //添加照片触发
  bindCamera: function () {
    wx.chooseImage({
      count: 4,
      success: (res) => {
        let ftbs = res.tempFilePaths;//照片路径
        let _picUrls = this.data.picUrls;
        console.log(ftbs);
        for (var item of ftbs) {
          // 地址入栈
          _picUrls.push(item);
          console.log(item);
        }
        console.log(_picUrls);
        //设置数据
        this.setData({
          picUrls: _picUrls,
          actionText: "+"
        })
        console.log(this.data.picUrls)
      },
      fail: (res) => (
        wx.showToast({
          title: '传失败',
          duration: 3000
        })
      )
    })
  },
  //刪除图片
  delPic: function (e) {
    //绑定标签的数据
    let index = e.target.dataset.index;
    let _picUrls = this.data.picUrls;
    // 数组中从index开始删除一个元素
    _picUrls.splice(index, 1)
    this.setData({
      picUrls: _picUrls
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
  onShareAppMessage: function () {

  }
})