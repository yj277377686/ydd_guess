<template>
	<view class="content">
		<view class="mineTop">
			<view class="companyname ui-cell">我的</view>
			<view class="loginBox ui-cell">
				<view class="userImg" v-if="userInfo.avatar"><image :src="userInfo.avatar"></image></view>
				<view class="userImg" v-else><image src="../../static/img/defult.png"></image></view>
				<view class="loginRight" >
					<view class="rightTop ui-cell">
						<view class="tapLogin" v-if="userInfo.nickname">{{userInfo.nickname}}</view>
						<view class="tapLogin" v-else @tap="gologin">点击登录</view>
						<view class="chatlist ui-cell" @tap="goMsg()">
							<view class="msgBox">
								<image src="../../static/img/msgmine.png" class="msgmine"></image>
							</view>
						</view>
					</view>
					<view class="userphone" v-if="userInfo.mobile">{{userInfo.mobile}}</view>
					<view class="userphone" v-else @tap="gologin">登录体验更多功能</view>
				</view>
			</view>
		</view>	 
		<view class="reBox">
			<view class="orderList">
				<view class="orderBox">
					<view class="orderTop ui-cell">
						<view class="topTitle">常用工具</view>
					</view>
					<view class="orderNav ui-cell">
						 <view class="orderStatus ui-cell"  @tap="goorders(1)">
							 <image src="/static/img/tool1.png" class="orderIco"></image>
							 <view class="orderTitle">我的钱包</view>
						 </view>
						 <view class="orderStatus ui-cell"  @tap="goorders(2)">
							 <image src="/static/img/tool8.png" class="orderIco"></image>
							 <view class="orderTitle">订单中心</view>
						 </view>
						 <view class="orderStatus ui-cell"  @tap="goorders(3)">
							 <image src="/static/img/jcjl.png" class="orderIco"></image>
							 <view class="orderTitle">我的竞猜</view>
						 </view>
						 <view class="orderStatus ui-cell"  @tap="goorders(4)">
							 <image src="/static/img/tool3.png" class="orderIco"></image>
							 <view class="orderTitle">推广中心</view>
						 </view>
						 <view class="orderStatus ui-cell"  @tap="goorders(5)">
							 <image src="/static/img/tool4.png" class="orderIco"></image>
							 <view class="orderTitle">问题反馈</view>
						 </view>
						 <view class="orderStatus ui-cell"  @tap="goorders(6)">
							 <image src="/static/img/tool2.png" class="orderIco"></image>
							 <view class="orderTitle">交易区</view>
						 </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { post } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	const app = getApp();
	export default {
		data () {
			return {
				isSDKReady: false,
				userInfo:[],
				currentPage: 2,
				paddingBottomHeight: 0, //苹果X以上手机底部适配高度
			}
		},
		mixins: [],
		onShow() {
			if(uni.getStorageSync('tokens')!=''){
				this.getuserinfo();
			}
		},
		created () {
			let that = this;
			uni.getSystemInfo({
			    success: function (res) {
			        let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
			        model.forEach(item => {
			            //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
			            if(res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
			                that.paddingBottomHeight = 40;
			            }
			        })
			    }
			})
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad() {
			
		},
		methods: {
			goorders(index){
				if(index==1){
					uni.navigateTo({
						url:'/pages/myWallet/myWallet'
					})
				}else if(index==2){
					// uni.navigateTo({
					// 	url:'/pages/mysale/mysale'
					// })
				}else if(index==3){
					uni.navigateTo({
						url:'/pages/mysale/mysale'
					})
				}else if(index==4){
					uni.navigateTo({
						url:'/pages/distribution/distribution'
					})
				}else if(index==5){
					uni.navigateTo({
						url:'/pages/feedBack/feedBack'
					})
				}else if(index==6){
					uni.navigateTo({
						url:'/pages/xuangou/xuangou'
					})
				}
			},
			onTabItemTap(e) {
			},
			//获取个人信息
			getuserinfo(){
				let that=this;
				let tokens=uni.getStorageSync('tokens');
				post('user/info/',{},tokens).then(res=>{
					console.log(res);
					if(res.code==1){
						that.userInfo=res.data;
						that.userInfo.mobile=this.userInfo.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
					}
				})
			},
			gologin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			goMsg(){
				uni.navigateTo({
					url:'/pages/userInfo/userInfo'
				})
			},
	    }
	}
</script>

<style>
	.toptl:first-child{
		border-right:1px dashed #e6e6e6;
	}
	.toptl{
		width: 50%;
		height: 60rpx;
		justify-content: center;
		font-size: 30rpx;
		font-weight: 700;
		color: #000;
	}
	.toolTop{
		width: 100%;
		height: auto;
		padding: 20rpx 0;
		justify-content: space-between;
		border-bottom: 1px dashed #e6e6e6;
	}
	.msgTil{
		font-size: 24rpx;
		color: #fff;
		margin-top: 10rpx;
	}
	.rightTop .chatlist{
		flex-direction: column;
		position: absolute;
		right: 0;
		top: -10rpx;
	}
	page{
		min-height: 110vh;
	}
	.toolItem{
		width: 25%;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 30rpx;
	}
	.toolList{
		width: 100%;
		height: auto;
		flex-wrap: wrap;
		margin-top: 30rpx;
	}
	.toolTitle{
		font-size: 30rpx;
		font-weight: 700;
		color: #1E1E31;
		padding: 26rpx 0;
		border-bottom: 1rpx dashed #E6E6E6;
	}
	.toolBox{
		width: 100%;
		height: auto;
		border-radius: 20rpx;
		background-color: #fff;
		margin-top: 30rpx;
		padding: 0 30rpx 30rpx 30rpx;
	}
	.orderTitle{
		font-size: 26rpx;
		color: #000;
		font-weight: 500;
	}
	.orderIco{
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 20rpx;
	}
	.orderStatus{
		width: 25%;
		flex-direction: column;
		justify-content: center;
		position: relative;
		margin-bottom: 30rpx;
	}
	.orderNav{
		width: 100%;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.rightImg{
		width: 12rpx;
		height: 20rpx;
	}
	.allorder{
		flex: 1;
		text-align: right;
		margin-right: 30rpx;
		color: #9C99AC;
		font-size: 28rpx;
	}
	.topTitle{
		font-size: 30rpx;
		color: #1E1E31;
		font-weight: 700;
	}
	.orderTop{
		width: 100%;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}
	.orderBox{
		width: 100%;
		height: auto;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
	}
	.orderList{
		width: 100%;
		height: auto;
		padding: 0 30rpx;
	    position: absolute;
		top: -122rpx;
		left: 0rpx;
	}
	.reBox{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.userphone{
		font-size: 26rpx;
		color: #fff;
	}
	.newmsg{
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #FFE044;
		position: absolute;
		right:0rpx;
	    top: 0rpx;
	}
	.msgBox{
		width: 50rpx;
		height: 50rpx;
		position: relative;
	}
	.tapLogin{
		font-size: 36rpx;
		color: #fff;
		font-weight: 700;
	}
	.rightTop{
		justify-content: space-between;
		margin-bottom: 16rpx;
	}
	.loginRight{
		flex: 1;
	}
	.userImg{
		width: 120rpx;
		height: 120rpx;
		margin-right: 30rpx;
		border-radius: 50%;
	}
	.userImg image{
		border-radius: 50%;
	}
	.loginBox{
		width: 100%;
		height: auto;
		padding: 0 40rpx;
		justify-content: flex-start;
	}
	.companyname{
		width: 100%;
		height: 60rpx;
		justify-content: center;
		font-size: 38rpx;
		color: #fff;
		margin: 90rpx 0 40rpx 0;
		font-weight: 500;
	}
   .mineTop{
		width: 100%;
		height: 720rpx;
		background: url('../../static/img/minetop.jpg') no-repeat  top  center ;
		background-size: 100% 100%;
   }
   .content{
	   padding-bottom: 200rpx;
   }
</style>