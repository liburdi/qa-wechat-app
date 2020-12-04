// components/popup/popup.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        modalType: {
            type: String,
            value: ''
        },

        title: {
            type: String,
            value: ''
        },
        content: {
            type: String,
            value: ''
        },
        cancelText: {
            type: String,
            value: ''
        },
        confirmText: {
            type: String,
            value: ''
        },
        imgUrl: {
            type: String,
            value: ''
        },
        confirmGetPhone: {
            type: Boolean,
            value: false
        },
        province: {
            type: Object,
            value: {}
        },
        city: {
            type: Object,
            value: {}
        },
        area: {
            type: Object,
            value: {}
        },
        address: {
            type: String,
            value: ''
        },
        contactName: {
            type: String,
            value: ''
        },
        contactPhone: {
            type: String,
            value: ''
        },
        hideConfirmBtn: {
            type: Boolean,
            value: false
        },
        avaterSrc: {
            type: String,
            value: ''
        },
        share: {
            type: Boolean,
            value: false
        },
        avaterStyle: {
            type: String,
            value: ''
        },
        openSetting: {
            type:Boolean,
            value:false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        showModal: false,
        manager: {

        },
        stars: [0, 1, 2, 3, 4],
        noStar: 'http://cdn.ddjf.com.cn/static/images/miniprogram/gray-star.png',
        selectedStar: 'http://cdn.ddjf.com.cn/static/images/miniprogram/orange-star.png',
        halfStar: 'http://cdn.ddjf.com.cn/static/images/anjie/half-star.png',
        hasGrade: true
    },

    /**
     * 组件的方法列表
     */
    methods: {
        preventTouchMove(e){
            console.log(e)
            e.stopPropagation()
        },
        makeCall() {
            var mobile = this.data.manager.mobileNo
            wx.makePhoneCall({
                phoneNumber: mobile,
            })
        },
        hide() {
            this.setData({
                showModal: false
            })
        },

        show() {
            this.setData({
                showModal: true
            })
            console.log(this.data.confirmGetPhone)
        },

        setManager(manager) {
            var stars = [0, 1, 2, 3, 4]
            if (manager.grade || manager.grade === 0) {
                stars = stars.map((item) => {
                    return manager.grad - item
                })
                this.setData({
                    hasGrade: true
                })
            } else {
                this.setData({
                    hasGrade: false
                })
            }
            this.setData({
                manager: manager,
                stars: stars
            })
        },

        getPhoneNumber(e) {

            if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
              e.detail.isAgree=false
                this.triggerEvent("getPhoneNumberEvent", e)

            } else { //同意授权
              e.detail.isAgree=true
                this.triggerEvent("getPhoneNumberEvent",e)

            }
            //session_key 未过期，并且在本生命周期一直有效


        },

        _onCancel(e) {
            this.triggerEvent("cancelEvent", e.detail)
        },

        _onConfirm(e) {
            this.triggerEvent("confirmEvent", e.detail)
        },
        _refreshShareTitle() {
            this.triggerEvent("refreshShareTitleEvent")

        },
        _selectAreaEvent() {
            this.triggerEvent("selectAreaEvent")
        },
        _addressForm(e) {
            this.triggerEvent("confirmEvent", e.detail)
            console.log(e.detail)
        },
        _handleSetting(e) {

        let that = this;
        that.hide()
        // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
        if (!e.detail.authSetting['scope.writePhotosAlbum']) {
            wx.showModal({
                title: '温馨提示',
                content: '若不打开授权，则无法将图片保存在相册中！',
                showCancel: false
            })

        } else {


        }
    },
    }
})
