let page = 1;
Page({
    data: {
        images: [],//瀑布流图片
        Arr1: [],//左列
        Arr2: [],//右列
    },
    //页面加载执行
    onLoad: function () {
        let This = this;
        This.loadImages();
    },
    /**
     * 页面在加载执行的是先执行加载一页
     * */
    loadImages: function () {
        let This = this;
        /**
         * 单图
         * */
        wx.request({
            url: 'http://www.love594.cn/index.php/Index/imglist',
            data: {
                p: page//显示第一页的数据
            },
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                console.log(res.data);
                if (res.data.arr) {//这是后台取出的数据，数组
                    let Arr1 = This.data.Arr1;// 先在data上建立数组col1
                    let Arr2 = This.data.Arr2;// 先在data上建立数组col2
                    for (let i = 0; i < res.data.arr.length; i++) {//在这里获取后台的数组
                        if (res.data.arr[i].id % 2 == 1) {//这里进行获取的 奇数偶数来进行数据分开
                            Arr1.push(res.data.arr[i]);//数组添加数据
                        } else {
                            Arr2.push(res.data.arr[i]);//数组添加数据
                        }
                    }
                    This.setData({
                        Arr1,//这里在进行数据赋值
                        Arr2//这里在进行数据赋值
                    });
                }
            }
        });
    },
    /**
     * 上拉加载
     * */
    lower: function (e) {
        console.log(e);
        console.log("上拉");
        /**
         * 原理相同
         * 这儿的数组也是获取已有的数组进行push增加
         **/
        let This = this;
        wx.request({
            url: 'http://www.love594.cn/index.php/Index/imglist',
            data: {
                p: ++page
            },
            header: {'content-type': 'application/json'},
            success: (res) => {
                console.log(res.data);
                if (res.data.arr) {
                    let Arr1 = This.data.Arr1;
                    let Arr2 = This.data.Arr2;
                    for (let i = 0; i < res.data.arr.length; i++) {
                        if (res.data.arr[i].id % 2 == 1) {
                            Arr1.push(res.data.arr[i]);
                        } else {
                            Arr2.push(res.data.arr[i]);
                        }
                    }
                    This.setData({
                        Arr1,
                        Arr2
                    });
                }
            }
        });
    },
    /**
     * 页面隐藏事件
     * */
    onUnload: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     * */
    onReachBottom: function () {
        // onReachBottom: 上拉触底
        // 监听用户上拉触底事件。
        // 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
        // 在触发距离内滑动期间，本事件只会被触发一次。
    }
});