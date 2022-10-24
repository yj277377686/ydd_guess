<template>
	<view class="contents">
		<view class="xyBox ui-cell" v-if="boxflag" @tap="checkbox">
			<view class="boxContent" @tap.stop='checkLbox'>
				<view class="xyTitle ui-cell" v-if="xyflag==1">服务协议</view>
				<view class="xyTitle ui-cell" v-if="xyflag==2">隐私政策</view>
				<view class="xyContent">
					<rich-text :nodes="xyContent"></rich-text>
				</view>
			</view>
		</view>
		<view class="topBox">
			<!-- <view class="gohis ui-cell" @tap="gohistory"><image src='../../static/img/goh.png' class="leftImg"></image>返回</view> -->
		</view>
		<view class="loginBox">
			<view class="comppanyName">有多多竞猜APP</view>
			<view class="titles ui-cell">
				<view class="lg" :class="tabIndex==1?'current':''" @click="on_tab(1)">登录</view>
				<view class="rg">/</view>
				<view class="lg" :class="tabIndex==2?'current':''" @click="on_tab(2)">注册</view>

			</view>
			<view class="loginInput ui-cell">
				<view class="inputTitle">+86</view>
				<input type="number" placeholder="请输入手机号码" class="inputname" maxlength='11' adjust-position="false"
					@input="changePhone">
			</view>

			<view class="loginInput ui-cell">
				<image src="/static/img/password.png" class="lgcode"></image>
				<input type="password" placeholder="请输入密码" class="inputname" maxlength='11' adjust-position="false"
					@input="changePassword">
			</view>

			<!-- <view class="loginInput ui-cell" v-if="invitationCode">
				<image src="/static/img/invitationCode.png" class="lgcode"></image>
				<input type="text" v-model="invitationCode" disabled placeholder="邀请码" class="inputname" maxlength='11'
					adjust-position="false">
			</view> -->

			<view class="loginInput ui-cell" v-if="tabIndex==2">
				<image src="/static/img/lgcode.png" class="lgcode"></image>
				<input type="number" placeholder="请输入短信验证码" maxlength='4' adjust-position="false" @input="changeCode"
					class="inputname">
				<view class="sendYzm ui-cell" @tap="sendymz" v-if="flag==1">获取验证码</view>
				<view class="sendYzm ui-cell" v-else>{{times}}s</view>
			</view>




			<view class="zcBox ui-cell">
				<image src="/static/img/no_check.png" class="checkImg" v-if="!checkFlag" @tap="changeCheckbox"></image>
				<image src="/static/img/check.png" class="checkImg" v-else @tap="changeCheckbox"></image>
				已阅读并同意<view class="fwze" @tap="checkXy(1)">《服务协议》</view>和<view class="fwze" @tap="checkXy(2)">《隐私政策》
				</view>
			</view>
			<view class="loginBtn ui-cell" @tap="sjLogin">{{tabIndex==1?'登 录':'注 册'}}</view>
		</view>
	</view>
</template>

<script>
import { post } from '../../utils/http.js';
import filtersMixin from '../../common/mixins/filters.js';
import Vue from '../../utils/vue.min.js';
const app = getApp();
import {
	mapState,
	mapMutations
} from 'vuex'
export default {
	data() {
		return {
			tabIndex: 1,
			tabList: ['登录', '注册'],
			xyflag: 1,
			phone: '',
			flag: 1,
			checkFlag: false,
			times: 60,
			xyContent: '',
			code: '',
			boxflag: false,
			path: '',
			password: ''
		}
	},
	computed: mapState(['forcedLogin']),
	mixins: [],
	onShow() {
		if (uni.getStorageSync('token')) {
			uni.redirectTo({
				url: '/pages/index/index'
			})
		}
	},
	created() {
	},
	//下拉刷新
	onPullDownRefresh() {

	},
	onLoad(option) {
		const that = this;
		if (option) {
			uni.setStorage({
				key: 'path',
				data: option.path
			});
		}
	},
	methods: {
		on_tab(index) {
			this.tabIndex = index
		},
		//返回
		goBack() {
			let canNavBack = getCurrentPages();
			if (canNavBack && canNavBack.length > 1) {
				uni.navigateBack({
					delta: 1
				});
			} else {
				history.back();
			}
		},
		gohistory() {
			// #ifdef APP-PLUS
			uni.navigateBack({
				delta: 1
			})
			// #endif
			// #ifdef H5 
			this.goBack();
			// #endif
		},
		//手机验证码登录/注册
		sjLogin() {

			let that = this;

			// 1登录 2注册
			if (this.tabIndex == 1) {

				if (!that.phone || that.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号',
					})
				}
				else if (!that.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码',
					})
				}
				else if (!that.checkFlag) {
					uni.showToast({
						icon: 'none',
						title: '请勾选注册协议',
					})
				} else {
					let phone = that.phone;
					let password = that.password;
					post('Account/Login/', { mobile: phone, client: 4, password: password }).then(res => {
						console.log(res);
						if (res.code == 1) {
							uni.setStorageSync('useInfo', JSON.stringify(res.data));
							uni.setStorageSync('tokens', res.data.token);
							this.$store.commit('login', res.data);
							uni.navigateTo({
								url: '/pages/index/index'
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg,
							})
						}
					})
				}

			} else {

				if (!that.phone || that.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号',
					})
				}
				else if (!that.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码',
					})
				}
				else if (!that.code || that.code.length != 4) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确验证码',
					})
				} else if (!that.checkFlag) {
					uni.showToast({
						icon: 'none',
						title: '请勾选注册协议',
					})
				} else {
					let phone = that.phone;
					let code = that.code;
					let password = that.password;
					post('Account/smsLogin/', { mobile: phone, code: code, client: 4, password: password }).then(res => {
						console.log(res);
						if (res.code == 1) {
							uni.setStorageSync('useInfo', JSON.stringify(res.data));
							uni.setStorageSync('tokens', res.data.token);
							this.$store.commit('login', res.data);
							uni.navigateTo({
								url: '/pages/index/index'
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg,
							})
						}
					})
				}

			}

		},
		checkbox() {
			this.boxflag = false;
		},
		checkLbox() { },
		//注册协议
		checkXy(status) {
			this.xyflag = status;
			this.boxflag = true;
			if (status == 1) {
				this.getfwxy();
			} else {
				this.getyszc();
			}
		},
		getfwxy() {
			let that = this;
			post('Policy/service/', {}).then(res => {
				let xyContent = res.data;
				this.xyContent = xyContent
			})
		},
		getyszc() {
			let that = this;
			post('Policy/privacy/', {}).then(res => {
				let xyContent = res.data;
				this.xyContent = xyContent
			})
		},
		changeCode(e) {
			this.code = e.target.value;
		},
		changePassword(e) {
			this.password = e.target.value;
		},
		changePhone(e) {
			this.phone = e.target.value;
		},
		//发送验证码
		sendymz() {
			var that = this;
			var phone = that.phone;
			if (!phone || phone.length != 11) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确手机号',
				})
			} else {
				that.flag = 2;
				var i = that.times;
				var interval;
				interval = setInterval(function () {
					i--;
					that.times = i;
					if (i === 0) {
						that.flag = 1;
						that.times = 60;
						clearInterval(interval);
					}
				}, 1000);
				that.getcode(phone);
			}
		},
		//获取验证码
		getcode(phone) {
			post('Sms/send/', { mobile: phone }).then(res => {
				console.log(res);
				uni.showToast({
					title: res.msg
				})
			})
		},
		//勾选协议
		changeCheckbox() {
			this.checkFlag = !this.checkFlag;
		}
	}
}
</script>

<style>
.xyContent {
	width: 100%;
	padding: 0 40rpx;
	overflow: scroll;
	height: 68vh;
}

.xyTitle {
	width: 100%;
	height: 120rpx;
	background: url('/static/img/fuxy.png') no-repeat top left;
	background-size: 100% 100%;
	font-size: 34rpx;
	color: #DF3927;
	justify-content: center;
}

.boxContent {
	width: 88%;
	height: 80vh;
	background-color: #fff;
	border-radius: 30rpx;
}

.xyBox {
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	justify-content: center;
}

.wxlg {
	width: 100rpx;
	height: 100rpx;
	position: absolute;
	left: 325rpx;
	bottom: 100rpx;
}

.loginBtn {
	width: 100%;
	height: 90rpx;
	justify-content: center;
	color: #fff;
	background-color: #DF3927;
	border-radius: 45rpx;
	font-size: 32rpx;
}

.fwze {
	color: #444444;
	margin: 0 4rpx;
}

.checkImg {
	width: 40rpx;
	height: 40rpx;
	margin-right: 20rpx;
}

.zcBox {
	width: 100%;
	height: 40rpx;
	justify-content: center;
	font-size: 26rpx;
	color: #999999;
	margin-top: 50rpx;
	margin-bottom: 30rpx;
}

.sendYzm {
	font-size: 28rpx;
	color: #222222;
	font-weight: 700;
}

.lgcode {
	width: 44rpx;
	height: 44rpx;
	margin-right: 40rpx;
}

.inputname {
	flex: 1;
	height: 100rpx;
	font-size: 28rpx;
	color: #131313;
}

.inputTitle {
	font-size: 30rpx;
	color: #444444;
	margin-right: 30rpx;
}

.loginInput {
	width: 100%;
	height: 100rpx;
	padding: 0 30rpx;
	border-radius: 50rpx;
	border: 1px solid #DEDEDE;
	background-color: #fff;
	justify-content: space-between;
	margin-bottom: 40rpx;
}

.rg {
	padding-bottom: 18rpx;
	margin: 0 20rpx;
}

.lg {
	padding-bottom: 10rpx;
	border-bottom: 8rpx solid transparent;
}

.current {
	border-bottom: 8rpx solid #DF3927;
}

.titles {
	width: 100%;
	padding-left: 20rpx;
	color: #444444;
	font-size: 32rpx;
	margin-bottom: 34rpx;
}

.loginTitle {
	width: 100%;
	padding-left: 20rpx;
	color: #444444;
	font-size: 30rpx;
	margin-bottom: 70rpx;
}

.comppanyName {
	width: 100%;
	padding-left: 20rpx;
	color: #222222;
	font-size: 38rpx;
	font-weight: 700;
	margin-bottom: 20rpx;
}

.loginBox {
	width: 100%;
	height: auto;
	padding: 100rpx 75rpx;
}

.leftImg {
	width: 30rpx;
	height: 30rpx;
	margin-right: 30rpx;
}

.gohis {
	justify-content: flex-start;
	font-size: 32rpx;
	color: #1A1A1A;
}

.topBox {
	width: 100%;
	height: auto;
	padding: 90rpx 0 0 30rpx;
	text-align: left;
}

.contents {
	width: 100%;
	height: 100vh;
	background: url('../../static/img/login.png') no-repeat top left;
	background-size: 100% 100%;
	position: relative;
}
</style>