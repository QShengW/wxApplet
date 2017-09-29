/**
 * author：QSW
 * company： xyj321.com
 * contact：982537765
 * 学习文档 7天 原生开始开发制作
 * */
//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        let logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        wx.login({
            success: function(res) {
                console.log(res);
                if (res.code) {
                } else {
                    console.log('获取用户登录态失败！')
                }
            }
        });
    },

    getUserInfo: function(cb) {
        let that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function(res) {
                    that.globalData.userInfo = res.userInfo;
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    globalData: {
        userInfo: null
    },

})
